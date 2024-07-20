const express = require('express');
const db = require('../models/db');

module.exports = () => {
  const router = express.Router();

  // Create an encounter and an invoice
  router.post('/create', async (req, res) => {
    const { patientId, amount } = req.body;

    if (!patientId || !amount) {
      return res.status(400).json({ error: 'Patient ID and amount are required' });
    }

    let connection;
    try {
      connection = await db.getConnection();
      await connection.beginTransaction();

      const [encounterResult] = await connection.execute('INSERT INTO encounters (patient_id, date) VALUES (?, NOW())', [patientId]);
      const encounterId = encounterResult.insertId;

      const [invoiceResult] = await connection.execute('INSERT INTO invoices (encounter_id, amount, date) VALUES (?, ?, NOW())', [encounterId, amount]);
      const invoiceId = invoiceResult.insertId;

      await connection.commit();
      res.json({ encounterId, invoiceId });
    } catch (err) {
      if (connection) {
        await connection.rollback();
        connection.release();
      }
      res.status(500).json({ error: err.message });
    } finally {
      if (connection) connection.release();
    }
  });

  // Add more routes for encounters if needed

  return router;
};
