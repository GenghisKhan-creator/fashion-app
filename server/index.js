const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
    console.log('Connected to PostgreSQL');
});

// API Routes
app.get('/api/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Product not found' });
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Auth Routes (Login/Register placeholders)
app.post('/api/auth/register', (req, res) => {
    // Logic for registration
    res.json({ message: 'User registered' });
});

app.post('/api/auth/login', (req, res) => {
    // Logic for login
    res.json({ user: { id: 1, email: 'test@example.com' }, token: 'mock-token' });
});

// Test route
app.get('/', (req, res) => {
    res.send('Fashion API is running');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
