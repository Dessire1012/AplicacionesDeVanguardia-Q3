const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  },
});

async function testConnection() {
  try {
    await knex.raw("SELECT 1+1 AS result");
    console.log("Conexión exitosa");
  } catch (error) {
    console.error("Error en la conexión:", error);
  }
}

testConnection();

const registerUser = async (user) => {
  try {
    const [userId] = await knex("users").insert({
      name: user.name,
      email: user.email,
      photo: user.photo,
      password: user.encryptedPassword,
      salt: user.salt,
    });
    return userId;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

const getCredentials = async (email) => {
  try {
    let credentials = await knex
      .select("password", "salt", "user_id")
      .from("users")
      .where("email", email)
      .first();

    return credentials || null;
  } catch (error) {
    console.error("Error retrieving credentials:", error);
    throw error;
  }
};

async function getAllUsers() {
  try {
    const users = await knex("users").select("*");
    return users;
  } catch (error) {
    console.error("Error retrieving users:", error);
    throw error;
  }
}

const getCredentialsById = async (id) => {
  try {
    let user = await knex
      .select("user_id", "name", "email", "photo")
      .from("users")
      .where("user_id", id)
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Error retrieving user by ID:", error);
    throw error;
  }
};

module.exports = {
  registerUser,
  getCredentials,
  getAllUsers,
  getCredentialsById,
};
