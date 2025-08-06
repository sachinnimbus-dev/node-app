require('dotenv').config(); 
console.log('SERVER =', process.env.DB_USER);

const config = {
  port: process.env.PORT || 3000,
  dbUri: process.env.DB_URI, 
  dbUser: process.env.DB_USER,  
  dbPassword: process.env.DB_PSWD,
  database: process.env.DB_NAME,    
   dbPort: process.env.DB_PORT  
};

module.exports = config;