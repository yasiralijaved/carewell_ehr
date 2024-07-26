const express = require('express');
const db = require('../models/db');

module.exports = () => {
  const router = express.Router();

  // Route to add a new doctor
  router.post('/add', async (req, res) => {
    const { name, contact } = req.body;
    if (!name || !contact) {
      return res.status(400).json({ error: 'Name and contact are required' });
    }
    try {
      const [result] = await db.execute('INSERT INTO doctors (name, contact) VALUES (?, ?)', [name, contact]);
      res.status(201).json({ id: result.insertId, name, contact });
    } catch (error) {
      console.error('Error adding doctor:', error);
      res.status(500).send('Error adding doctor');
    }
  });

  // Route to get all doctors
  router.get('/', async (req, res) => {
    try {
      const [doctors] = await db.execute('SELECT * FROM doctors');
      res.status(200).json(doctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      res.status(500).send('Error fetching doctors');
    }
  });

  // Delete a doctor
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const [result] = await db.execute('DELETE FROM doctors WHERE id = ?', [id]);
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Doctor deleted successfully' });
      } else {
        res.status(404).json({ message: 'Doctor not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};
