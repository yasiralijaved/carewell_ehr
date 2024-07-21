const express = require('express');
const db = require('../models/db');

module.exports = () => {
  const router = express.Router();

  // Route to create a new encounter
  router.post('/', async (req, res) => {
    const { patientId, doctorId, date, is_invoiced } = req.body;

    if (!patientId || !doctorId || !date) {
      return res.status(400).json({ error: 'Patient ID, doctor ID, and date are required' });
    }

    try {
      const [result] = await db.execute(
        'INSERT INTO encounters (patient_id, doctor_id, date, is_invoiced) VALUES (?, ?, ?, ?)',
        [patientId, doctorId, date, is_invoiced]
      );
      res.status(201).json({ encounterId: result.insertId });
    } catch (error) {
      console.error('Error creating encounter:', error);
      res.status(500).send('Error creating encounter');
    }
  });

  // Route to get all encounters for a patient
  router.get('/patient/:patientId', async (req, res) => {
    const { patientId } = req.params;
    try {
      const [encounters] = await db.execute('SELECT * FROM encounters WHERE patient_id = ?', [patientId]);
      res.status(200).json(encounters);
    } catch (error) {
      console.error('Error fetching encounters:', error);
      res.status(500).send('Error fetching encounters');
    }
  });

  // Route to update an encounter's is_invoiced status
  router.put('/:encounterId/invoiced', async (req, res) => {
    const { encounterId } = req.params;
    try {
      await db.execute('UPDATE encounters SET is_invoiced = ? WHERE id = ?', [true, encounterId]);
      res.status(200).send('Encounter invoiced status updated');
    } catch (error) {
      console.error('Error updating encounter invoiced status:', error);
      res.status(500).send('Error updating encounter invoiced status');
    }
  });

  return router;
};
