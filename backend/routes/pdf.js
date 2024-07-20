const express = require('express');
const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const db = require('../models/db');

module.exports = () => {
  const router = express.Router();

  router.get('/generate-invoice/:invoiceId', async (req, res) => {
    const { invoiceId } = req.params;

    try {
      // Fetch invoice details from the database
      const [invoiceRows] = await db.execute('SELECT * FROM invoices WHERE id = ?', [invoiceId]);
      if (invoiceRows.length === 0) {
        return res.status(404).send('Invoice not found');
      }
      const invoice = invoiceRows[0];

      const [encounterRows] = await db.execute('SELECT * FROM encounters WHERE id = ?', [invoice.encounter_id]);
      if (encounterRows.length === 0) {
        return res.status(404).send('Encounter not found');
      }
      const encounter = encounterRows[0];

      const [patientRows] = await db.execute('SELECT * FROM patients WHERE id = ?', [encounter.patient_id]);
      if (patientRows.length === 0) {
        return res.status(404).send('Patient not found');
      }
      const patient = patientRows[0];

      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 800]);
      const { width, height } = page.getSize();

      // Load the logo image
      const imagePath = path.join(__dirname, '../assets/logo.png');
      const imageBytes = fs.readFileSync(imagePath);
      const image = await pdfDoc.embedPng(imageBytes);

      // Draw header
      page.drawRectangle({
        x: 0,
        y: height - 50,
        width,
        height: 50,
        color: rgb(0.30980, 0.71764, 0.709803),
      });

      const imageDimensions = image.scale(0.07);
      page.drawImage(image, {
        x: 45,
        y: height - 52,
        width: imageDimensions.width,
        height: imageDimensions.height,
      });

      page.drawText('CareWell', {
        x: 110,
        y: height - 40,
        size: 30,
        color: rgb(1, 1, 1),
      });
      page.drawRectangle({
        x: 0,
        y: height - 100,
        width,
        height: 50,
        color: rgb(0.30980, 0.71764, 0.709803),
      });
      page.drawText('MEDICAL BILLING INVOICE', {
        x: 50,
        y: height - 82,
        size: 15,
        color: rgb(1, 1, 1),
      });

      // Patient Information
      page.drawText('PATIENT INFORMATION', {
        x: 50,
        y: height - 150,
        size: 12,
        color: rgb(0.95686, 0.38039, 0.23137),
      });
      page.drawText(`Name: ${patient.name}`, {
        x: 50,
        y: height - 170,
        size: 10,
        color: rgb(0, 0, 0),
      });
      page.drawText(`Contact: ${patient.contact}`, {
        x: 50,
        y: height - 190,
        size: 10,
        color: rgb(0, 0, 0),
      });
      // Add more patient details as necessary

      // Doctor Information
      page.drawText('PRESCRIBING PHYSICIAN\'S INFORMATION', {
        x: 300,
        y: height - 150,
        size: 12,
        color: rgb(0.95686, 0.38039, 0.23137),
      });
      // You would normally fetch the doctor information from your database
      page.drawText(`Dr. Abdullah`, {
        x: 300,
        y: height - 170,
        size: 10,
        color: rgb(0, 0, 0),
      });
      page.drawText(`Contact: (0310) 4334 717`, {
        x: 300,
        y: height - 190,
        size: 10,
        color: rgb(0, 0, 0),
      });

      // Invoice Details
      page.drawText('INVOICE #', {
        x: 50,
        y: height - 230,
        size: 10,
        color: rgb(0, 0, 0),
      });
      page.drawText(invoice.id.toString(), {
        x: 50,
        y: height - 250,
        size: 10,
        color: rgb(0, 0, 0),
      });

      page.drawText('DATE', {
        x: 150,
        y: height - 230,
        size: 10,
        color: rgb(0, 0, 0),
      });
      page.drawText(new Date(invoice.date).toLocaleDateString('en-GB'), {
        x: 150,
        y: height - 250,
        size: 10,
        color: rgb(0, 0, 0),
      });

      page.drawText('AMOUNT DUE', {
        x: 300,
        y: height - 230,
        size: 10,
        color: rgb(0, 0, 0),
      });
      page.drawText(`PKR ${invoice.amount}`, {
        x: 300,
        y: height - 250,
        size: 10,
        color: rgb(0, 0, 0),
      });

      // Table Header
      page.drawLine({
        start: { x: 50, y: height - 280 },
        end: { x: width - 50, y: height - 280 },
        thickness: 1,
        color: rgb(0.8, 0.8, 0.8),
      });

      page.drawText('ITEM', {
        x: 50,
        y: height - 300,
        size: 10,
        color: rgb(0, 0, 0),
      });
      page.drawText('DESCRIPTION', {
        x: 200,
        y: height - 300,
        size: 10,
        color: rgb(0, 0, 0),
      });
      page.drawText('AMOUNT', {
        x: 400,
        y: height - 300,
        size: 10,
        color: rgb(0, 0, 0),
      });

      // Table Rows
      const lineHeight = 20;
      let yPosition = height - 320;
      // Assuming you have items in your invoice details
      const items = [
        { name: 'Full Check Up', description: 'Full body check up', amount: '745.00' },
        { name: 'Ear & Throat Examination', description: 'Infection check due to inflammation', amount: '1000.00' },
      ];

      items.forEach(item => {
        page.drawText(item.name, {
          x: 50,
          y: yPosition,
          size: 10,
          color: rgb(0, 0, 0),
        });
        page.drawText(item.description, {
          x: 200,
          y: yPosition,
          size: 10,
          color: rgb(0, 0, 0),
        });
        page.drawText(`PKR ${item.amount}`, {
          x: 400,
          y: yPosition,
          size: 10,
          color: rgb(0, 0, 0),
        });
        yPosition -= lineHeight;
      });

      // Summary
      yPosition -= lineHeight;
      page.drawText('SUB TOTAL', {
        x: 50,
        y: yPosition,
        size: 10,
        color: rgb(0, 0, 0),
      });
      page.drawText('PKR 1745.00', {
        x: 400,
        y: yPosition,
        size: 10,
        color: rgb(0, 0, 0),
      });

      yPosition -= lineHeight;
      page.drawText('TAX RATE', {
        x: 50,
        y: yPosition,
        size: 10,
        color: rgb(0, 0, 0),
      });
      page.drawText('9%', {
        x: 400,
        y: yPosition,
        size: 10,
        color: rgb(0, 0, 0),
      });

      yPosition -= lineHeight;
      page.drawText('TAX', {
        x: 50,
        y: yPosition,
        size: 10,
        color: rgb(0, 0, 0),
      });
      page.drawText('PKR 157.05', {
        x: 400,
        y: yPosition,
        size: 10,
        color: rgb(0, 0, 0),
      });

      yPosition -= lineHeight;
      page.drawText('TOTAL', {
        x: 50,
        y: yPosition,
        size: 10,
        color: rgb(0, 0, 0),
      });
      page.drawText('PKR 1902.05', {
        x: 400,
        y: yPosition,
        size: 10,
        color: rgb(0, 0, 0),
      });

      const pdfBytes = await pdfDoc.save();
      
      res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');
      res.setHeader('Content-Type', 'application/pdf');
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).send('Error generating PDF');
    }
  });

  return router;
};
