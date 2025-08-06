
const express = require('express');
const app = express();
const sql = require('mssql');
const port = process.env.PORT || 3000;

const db_config = {
    user: 'sqlserver',  
    password:   'root',
    server: '34.134.20.213' , 
    database: 'NAGP',  
    options: {
        encrypt: false,  
        trustServerCertificate: false  
    },
    port: 1433 
};
 
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

app.post('/api/data', async (req, res) => {

        res.json({
            message: 'User Data',
            user:[{name: 'John Doe', age: 30},{name: 'Test', age: 30},{name: 'ev', age: 35}],
            status: 'success'});
}); 

// Start the server
app.listen(port, () => {
  console.log(`Server listening`);
  console.log(`Server listening at http://localhost:${port}`);
});

