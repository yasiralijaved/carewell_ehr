const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const checkPermissions = require('../middleware/permissions');
const authenticateToken = require('../middleware/auth');

const db = require('../models/db');

module.exports = () => {
  const router = express.Router();


  // Set up multer for file upload
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      // Use the doctor's ID as the filename
      const doctorId = req.body.id;
      const fileExtension = path.extname(file.originalname);
      cb(null, `${doctorId}${fileExtension}`);
    },
  });

  const upload = multer({ storage: storage });

  // Route to add a new doctor
  router.post('/add', authenticateToken, checkPermissions('create', 'Doctor'), async (req, res) => {
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
  router.get('/', authenticateToken, checkPermissions('read', 'Doctor'), async (req, res) => {
    try {
      const [doctors] = await db.execute('SELECT * FROM doctors');
      res.status(200).json(doctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      res.status(500).send('Error fetching doctors');
    }
  });

  // Delete a doctor
  router.delete('/:id', authenticateToken, checkPermissions('delete', 'Doctor'), async (req, res) => {
    const { id } = req.params;
    var profilePic = '';
    try {
      // Retrieve the doctor's profile picture filename
      const [rows] = await db.execute('SELECT profile_pic FROM doctors WHERE id = ?', [id]);
      if (rows.length > 0) {
        profilePic = rows[0].profile_pic;
      }
      // Delete the doctor record from the database
      const [result] = await db.execute('DELETE FROM doctors WHERE id = ?', [id]);
      if (result.affectedRows > 0) {
        // Attempt to delete the profile picture file if it exists
        if (profilePic) {
          const profilePicPath = path.join(__dirname, '..', 'uploads', profilePic);
          if (fs.existsSync(profilePicPath)) {
            try {
              fs.unlinkSync(profilePicPath);
            } catch (err) {
              console.error(`Failed to delete profile picture: ${err.message}`);
            }
          }
        }
        res.status(200).json({ message: 'Doctor deleted successfully' });
      } else {
        res.status(404).json({ message: 'Doctor not found' });
      }
    } catch (error) {
      throw error;
      res.status(500).json({ error: error.message });
    }
  });

  // Update doctor's profile picture
router.post('/upload', authenticateToken, checkPermissions('upload', 'DoctorPic'), upload.single('profilePic'), async (req, res) => {
  const { id } = req.body;
  const profilePic = req.file ? req.file.filename : null;

  try {
    // Check if the doctor already has a profile picture
    const [rows] = await db.execute('SELECT profile_pic FROM doctors WHERE id = ?', [id]);
    if (rows.length > 0 && rows[0].profile_pic) {
      // Delete the existing profile picture file
      const oldProfilePic = path.join(__dirname, '..', 'uploads', rows[0].profile_pic);
      if (fs.existsSync(oldProfilePic)) {
        fs.unlinkSync(oldProfilePic);
      }
    }

    await db.execute(
      'UPDATE doctors SET profile_pic = ? WHERE id = ?',
      [profilePic, id]
    );
    res.status(200).json({ message: 'Profile picture updated', profilePic });
  } catch (error) {
    throw error;
    res.status(500).json({ error: error.message });
  }
});


  return router;
};
