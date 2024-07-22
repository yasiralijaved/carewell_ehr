const express = require('express');
const db = require('../models/db');

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

  // Get invoices by patient ID
  router.get('/patient/:patientId', async (req, res) => {
    const { patientId } = req.params;
    try {
      const [rows] = await db.execute(`
        SELECT invoices.*, doctors.name AS doctor_name
        FROM invoices
        JOIN encounters ON invoices.encounter_id = encounters.id
        JOIN doctors ON encounters.doctor_id = doctors.id
        WHERE encounters.patient_id = ?
      `, [patientId]);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Get an invoice by ID
  // router.get('/:id', async (req, res) => {
  //   const { id } = req.params;
  //   try {
  //     const [rows] = await db.execute('SELECT * FROM invoices WHERE id = ?', [id]);
  //     if (rows.length === 0) {
  //       return res.status(404).json({ error: 'Invoice not found' });
  //     }
  //     res.json(rows[0]);
  //   } catch (err) {
  //     res.status(500).json({ error: err.message });
  //   }
  // });
  router.get('/:patientId', async (req, res) => {
    const { id } = req.params;
    try {
      const [results] = await db.query(`
        SELECT invoices.*, doctors.name AS doctor_name
        FROM invoices
        JOIN encounters ON invoices.encounter_id = encounters.id
        JOIN doctors ON encounters.doctor_id = doctors.id
        WHERE invoices.id = ?
      `, [id]);
      res.json(results[0]);
    } catch (error) {
      console.error('Error fetching invoice:', error);
      res.status(500).json({ error: 'Error fetching invoice' });
    }
  });

  // Create a new invoice
  router.post('/', async (req, res) => {
    const { encounterId, amount } = req.body;
    if (!encounterId || !amount) {
      return res.status(400).json({ error: 'Encounter ID and amount are required' });
    }
    try {
      const [result] = await db.execute('INSERT INTO invoices (encounter_id, amount, date) VALUES (?, ?, NOW())', [encounterId, amount]);
      res.status(201).json({ id: result.insertId, encounterId, amount });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Update an invoice by ID
  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { encounterId, amount } = req.body;
    if (!encounterId || !amount) {
      return res.status(400).json({ error: 'Encounter ID and amount are required' });
    }
    try {
      const [result] = await db.execute('UPDATE invoices SET encounter_id = ?, amount = ? WHERE id = ?', [encounterId, amount, id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Invoice not found' });
      }
      res.json({ id, encounterId, amount });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Delete an invoice by ID
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const [result] = await db.execute('DELETE FROM invoices WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Invoice not found' });
      }
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
