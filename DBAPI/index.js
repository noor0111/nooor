const express = require('express');
const cors = require('cors');
const pool = require('./db'); 
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    try {
        res.json('WELCOME TO N&R Salon');
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

// List of your actual tables
const tables = [
    'clients',
    'services',
    'products',
    'staff',
    'appointments',
    'serviceproducts',
    'staffservices',
    'payments',
    'clientfeedback',
    'promotions'
];

// Auto-generate GET routes for each table
for (const table of tables) {
    app.get(`/${table.toLowerCase()}`, async (req, res) => {
        try {
            const result = await pool.query(`SELECT * FROM ${table}`);
            res.json(result.rows);
        } catch (err) {
            console.error(`Error fetching from ${table}:`, err.message);
            res.status(500).json({ Error: err.message });
        }
    });
}

// Server listening

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Connected successfully.. on PORT ${PORT}`);
});