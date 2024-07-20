const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const patientRoutes = require('./routes/patients')();
const encounterRoutes = require('./routes/encounters')();
const invoiceRoutes = require('./routes/invoices')();
const pdfRoutes = require('./routes/pdf')();

app.use('/api/patients', patientRoutes);
app.use('/api/encounters', encounterRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/pdf', pdfRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
