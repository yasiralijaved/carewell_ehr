const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' }); // Temporary folder to store uploaded files

module.exports = () => {
  const router = express.Router();

  // Export the database
  router.get('/export', (req, res) => {
    const dumpFile = path.join(__dirname, '../uploads/carewell_db.sql');
    const command = `mysqldump -h ${process.env.DB_HOST} -u ${process.env.DB_USER} -p${process.env.DB_PASSWORD} ${process.env.DB_NAME} > ${dumpFile}`;

    exec(command, (error) => {
      if (error) {
        console.error('Error exporting database:', error);
        return res.status(500).send('Error exporting database');
      }
      res.download(dumpFile, 'carewell_db.sql', (err) => {
        if (err) {
          console.error('Error downloading the file:', err);
        }
        fs.unlinkSync(dumpFile); // Delete the file after download
      });
    });
  });

  // Import the database
  router.post('/import', upload.single('file'), (req, res) => {
    const dumpFile = req.file.path;
    const command = `mysql -h ${process.env.DB_HOST} -u ${process.env.DB_USER} -p${process.env.DB_PASSWORD} ${process.env.DB_NAME} < ${dumpFile}`;

    exec(command, (error) => {
      fs.unlinkSync(dumpFile); // Delete the uploaded file after import
      if (error) {
        console.error('Error importing database:', error);
        return res.status(500).send('Error importing database');
      }
      res.send('Database imported successfully');
    });
  });

  return router;
};
