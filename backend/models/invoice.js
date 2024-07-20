const db = require('./db');

const createInvoice = (encounterId, amount, callback) => {
  const query = 'INSERT INTO invoices (encounter_id, amount, date) VALUES (?, ?, NOW())';
  db.query(query, [encounterId, amount], (err, result) => {
    if (err) return callback(err);
    callback(null, result.insertId);
  });
};

const getInvoicesByPatient = (patientId, callback) => {
  const query = `
    SELECT i.id, i.amount, i.date
    FROM invoices i
    JOIN encounters e ON i.encounter_id = e.id
    WHERE e.patient_id = ?
  `;
  db.query(query, [patientId], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

module.exports = {
  createInvoice,
  getInvoicesByPatient,
};
