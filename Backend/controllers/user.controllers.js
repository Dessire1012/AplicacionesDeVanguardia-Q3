const HTTPCodes = require("../utils/HTTPCodes");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const { isEmail, isPassword } = require("../utils/validator");
const { registerUser, getCredentials, getAllUsers } = require("../services/user.services");

async function register(req, res) {
    const {email, password} = req.body;
    try{
      const errorMessages=[];
      if (!isEmail(email)) {
        errorMessages.push("Email is not valid.")
      }
    
      if (!isPassword(password)) {        
        errorMessages.push("Password is not valid.")
      }
  
      if(errorMessages.length){
        res.status(HTTPCodes.BAD_REQUEST).send({error: errorMessages});
      }else{
        const salt = crypto.randomBytes(128).toString("base64");
        const encryptedPassword = crypto
        .pbkdf2Sync(password, salt, 30000, 64, "sha256")
        .toString("base64");

        const [newUserId] = await registerUser({
            email, 
            encryptedPassword, 
            salt, 
          });
        
        res.send({
          success: true,
          newUserId,
        });
      }
    }catch(e)
    {
      res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
        error: "There is already a user with this email"
      });
    }
}

    async function login(req, res) {
      const {email, password} = req.body;
      try{
        const errorMessages=[];
        if (!isEmail(email)) {
          errorMessages.push("Email is not valid.")
        }
      
        if (!isPassword(password)) {
          errorMessages.push("Password is not valid.")
        }
    
        if(errorMessages.length){
          res.status(HTTPCodes.BAD_REQUEST).send({error: errorMessages});
        }else{
            const [credentials] = await getCredentials(email);
          
            const encryptedPassword = crypto
                .pbkdf2Sync(password, credentials.salt, 30000, 64, "sha256")
                .toString("base64");

          
            if(encryptedPassword === credentials.password) {
                const accessToken = jwt.sign({email}, process.env.TOKENKEY || "AS4D5FF6G78NHCV7X6X5C",
                {
                    expiresIn: "1d"
                });
                  
                const refreshToken = jwt.sign({email}, process.env.TOKENKEY || "AS4D5FF6G78NHCV7X6X5C", 
                {
                    expiresIn: "1m"
                });
                res.send({
                    accessToken,
                    refreshToken,
                    id: credentials.id
                });
                }else {
                    
                    res.status(HTTPCodes.UNAUTHORIZED).send({
                        error: "Password incorrect",
                    });
            }     
        }
      }catch(e) {
        res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
          error: "There isn't a user with this email",
        });
      }
    }

    async function getUsers(req, res) {
        try {
          const users = await getAllUsers();
          res.send(users);
        } catch (e) {
          res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
            error: "No se pudo obtener los usuarios.",
          });
        }
      }

    module.exports = {
        register,
        login,
        getUsers,
    };
    