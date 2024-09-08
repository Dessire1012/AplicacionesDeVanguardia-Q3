const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const crypto = require("crypto");

const fs = require("fs");
const YAML = require("yaml");
const swaggerUi = require("swagger-ui-express");

const file = fs.readFileSync("./swagger.yaml", "utf8");
const swaggerDocument = YAML.parse(file);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());

const userRouter = require("./routes/user.routes");

app.use("/user", userRouter);

const {
  registerUser,
  getCredentials,
  getAllUsers,
  getCredentialsById,
} = require("./services/user.services");

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await getCredentials(profile.emails[0].value);

        if (existingUser) {
          return done(null, existingUser);
        } else {
          const salt = crypto.randomBytes(16).toString("base64");
          const password = crypto.randomBytes(16).toString("base64");
          const encryptedPassword = crypto
            .pbkdf2Sync(password, salt, 100000, 64, "sha512")
            .toString("base64");

          const newUser = {
            name: profile.displayName,
            email: profile.emails[0].value,
            photo: String(profile.photos[0].value),
            encryptedPassword,
            salt,
          };

          const userId = await registerUser(newUser);
          newUser.user_id = userId;

          return done(null, newUser);
        }
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("Serializing user:", user);
  done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getCredentialsById(id);
    if (user) {
      done(null, user);
    } else {
      done(new Error("User not found"), null);
    }
  } catch (err) {
    done(err, null);
  }
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:3000/chatbot");
  }
);

app.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.redirect("/");
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to the home page!");
});

app.listen(3001, () => {
  console.log("Server started on http://localhost:3001");
});
