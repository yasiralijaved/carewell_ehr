# CareWell Medical EHR (Electronic Health Record) System

This project is a Electronic Health Record system for medical clinics, built using Node.js, Express, MySQL, and Docker. The system generates PDF invoices styled according to a specific template.

## Features

- Generate medical billing invoices in PDF format
- Use a styled template for the PDF invoices
- Fetch patient and invoice data from a MySQL database
- Run the entire application in Docker containers

## Prerequisites

Before running this project, ensure you have the following installed on your machine:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/yasiralijaved/carewell_ehr.git
cd carewell_ehr
```

## Docker Setup
Build and run the Docker containers using Docker Compose.
```bash
docker compose up --build
```

This command will:

Build the Docker images for the backend and frontend.
Create and start the containers for the backend, frontend, and MySQL database.
Run database migrations to set up the initial schema.

## Access the Application
Once the containers are up and running, you can access the application:

- Backend API: http://localhost:5000
- Frontend: http://localhost:3000

## Project Structure
```bash
carewell-ehr/
├── db_init/
│   ├── init.sql
├── backend/
│   ├── models/
│   │   └── db.js
│   ├── routes/
│   │   ├── patients.js
│   │   ├── encounters.js
│   │   ├── invoices.js
│   │   └── pdf.js
│   ├── Dockerfile
│   └── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CreateInvoiceDialog.js
│   │   │   ├── InvoiceListDialog.js
│   │   │   ├── PatientForm.js
│   │   │   └── PatientList.js
│   │   │   └── PatientListItem.js
│   │   │   └── SearchBar.js
│   │   │   └── TableHeader.js
│   │   ├── utils/
│   │   │   ├── dateUtils.js
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── theme.js
│   ├── public/
│   │   ├── index.html
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```
## Running the Application
Starting the Application
To start the application, run the following command:
```bash
docker compose up --build
```

## Stopping the Application
To stop the application, run the following command:
```bash
docker compose down
```

## API Endpoints
### Generate Invoice PDF
```bash
GET /api/pdf/generate-invoice/:invoiceId
```
> Generate a PDF invoice for the given invoiceId.

## Example Usage
You can test the API endpoints using a tool like Postman or curl.
```bash
curl -O -J http://localhost:5000/api/pdf/generate-invoice/1
```
> This command will download the generated PDF invoice with ID 1.
