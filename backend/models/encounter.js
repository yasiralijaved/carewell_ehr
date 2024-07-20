const db = require('./db');

const createEncounter = (patientId, callback) => {
  const query = 'INSERT INTO encounters (patient_id, date) VALUES (?, NOW())';
  db.query(query, [patientId], (err, result) => {
    if (err) return callback(err);
    callback(null, result.insertId);
  });
};

module.exports = {
  createEncounter,
};
