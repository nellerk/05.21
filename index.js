const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const session = require('express-session');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.send('Welcome to the Vehicle Rental Service!');
  });

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rent'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL server.');
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: '123456789',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

// User registration
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err, result) => {
        if (err) throw err;
        res.send('User registered successfully!');
    });
});

// User login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Simulate authentication logic
    if (email === 'test@example.com' && password === 'password') {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Submit a review
app.post('/review', (req, res) => {
    const { userId, vehicleId, content } = req.body;

    db.query('INSERT INTO reviews (userId, vehicleId, content) VALUES (?, ?, ?)', [userId, vehicleId, content], (err, result) => {
        if (err) {
            return res.status(500).send('Failed to submit review');
        }
        res.send('Review submitted successfully!');
    });
});

app.get('/vehicles', (req, res) => {
    db.query('SELECT * FROM vehicles', (err, results) => {
        if (err) {
            return res.status(500).send('Database query failed');
        }
        res.json(results);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
