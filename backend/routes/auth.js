const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/db');

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret';

module.exports = () => {
    const router = express.Router();

    // Get all invoices
  router.get('/', async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM invoices');
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
    // User registration
    router.post('/register', async (req, res) => {
        const { username, password, role } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const [roleRow] = await db.execute('SELECT id FROM roles WHERE name = ?', [role]);
            const roleId = roleRow[0].id;
            await db.execute('INSERT INTO users (username, password, role_id) VALUES (?, ?, ?)', [username, hashedPassword, roleId]);
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // User login
    router.post('/login', async (req, res) => {
        const { username, password } = req.body;
        console.log(`username = ${username}`);
        //console.log("/login");
        try {
            const [userRow] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
            if (userRow.length === 0) {
                return res.status(400).json({ message: 'Invalid username or password' });
            }
            const user = userRow[0];
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(400).json({ message: 'Invalid username or password' });
            }

            const [userRoleRow] = await db.execute('SELECT * FROM user_roles WHERE user_id = ?', [user.id]);
            if (userRoleRow.length === 0) {
                return res.status(400).json({ message: 'Invalid user role' });
            }
            const userRole = userRoleRow[0];
            console.log(`${userRole.role_id}`);

            const [roleRows] = await db.execute('SELECT * FROM roles WHERE id = ?', [userRole.role_id]);
            const role = roleRows[0].role_name;

            
            console.log(`${role}`);

            const token = jwt.sign({ id: user.id, role: role }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
}