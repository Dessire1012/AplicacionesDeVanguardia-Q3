const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host: process.env.HOST,
      port: process.env.PORT,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE
    }
  });

async function testConnection() {
  try {
      await knex.raw('SELECT 1+1 AS result');
      console.log('Conexión exitosa');
  } catch (error) {
      console.error('Error en la conexión:', error);
  }
}

testConnection();
  
  const registerUser = async (user) => {
    try {
      return await knex("users").insert({
        email: user.email,
        password: user.encryptedPassword,
        salt: user.salt,
      });
    } catch (error) {
      console.error('Error registering user:', error);
        throw error;
    }
  };
  
  const getCredentials = async (email) => {
    try {
      let credentials = await knex
        .select("password", "salt", "user_id")
        .from("users")
        .where("email", email);
    
        if (!credentials) {
          throw new Error('No credentials found for this email');
        }

      return credentials;
    } catch (error) {
      console.error('Error retrieving credentials:', error);
        throw error;
    }
  };

  async function getAllUsers() {
    try {
        const users = await knex('users').select('*');
        return users;
    } catch (error) {
        console.error('Error retrieving users:', error);
        throw error;
    }
}

  
  module.exports = {
    registerUser,
    getCredentials,
    getAllUsers,
  };