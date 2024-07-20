const express = require('express');
const db = require('../models/db');

module.exports = () => {
  const router = express.Router();

  // Get all patients
  router.get('/', async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM patients');
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Get a patient by ID
  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await db.execute('SELECT * FROM patients WHERE id = ?', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Patient not found' });
      }
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Create a new patient
  router.post('/', async (req, res) => {
    const { name, age, gender, contact } = req.body;
    if (!name || !age || !gender || !contact) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    try {
      const [result] = await db.execute('INSERT INTO patients (name, age, gender, contact) VALUES (?, ?, ?, ?)', [name, age, gender, contact]);
      res.status(201).json({ id: result.insertId, name, age, gender, contact });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Update a patient by ID
  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, age, gender, contact } = req.body;
    if (!name || !age || !gender || !contact) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    try {
      const [result] = await db.execute('UPDATE patients SET name = ?, age = ?, gender = ?, contact = ? WHERE id = ?', [name, age, gender, contact, id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Patient not found' });
      }
      res.json({ id, name, age, gender, contact });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Delete a patient by ID
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const [result] = await db.execute('DELETE FROM patients WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Patient not found' });
      }
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};