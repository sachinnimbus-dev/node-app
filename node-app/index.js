const express = require('express');
const app = express();
const sql = require('mssql');
const port = process.env.PORT || 3000;
  
const db_config = {
    user: process.env.DB_USER,  
    password: process.env.DB_PSWD,
    server: process.env.DB_URI, 
    database:process.env.DB_NAME,  
    options: {
        encrypt: false,  
        trustServerCertificate: false  
    },
    port: process.env.DB_PORT  
};
 
console.log('DB_Server =', process.env.DB_URI);

// Middleware to parse JSON request bodies
app.use(express.json());
 
app.get('/', (req, res) => {
  res.send('NAGP WebAPI is running...Use /api/data to fetch data from SQL DB!!');
});

app.get('/api/data', async (req, res) => {         
        try {
            console.log("Opening db connection"); // The fetched data
            await sql.connect(db_config);
            const result = await sql.query('SELECT * FROM Sample');
            console.log(result.recordset); // The fetched data
            res.send(result.recordset);
        } catch (err) {
            console.error('Database connection or query error:', err);
        } finally {
            await sql.close(); // Close the connection
        }
}); 
  
// Start the server
app.listen(port, () => {
  console.log(`Server listening`);
  console.log(`Server listening at http://localhost:${port}`);
});

