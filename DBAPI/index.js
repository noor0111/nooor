/**
 * index.js – Salon Management System back-end
 * ------------------------------------------
 * Ronaq Bahadur Ali · Noor us Saba Farooqui
 */

const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Health-check
app.get('/', (req, res) => res.json('WELCOME TO N&R Salon'));

/* ---------- GENERIC SELECT ALL ---------- */
const tables = [
  'clients',
  'services',
  'products',
  'staff',
  'appointments',
  'serviceproducts',
  'staffservices',
  'payments',
  'clientfeedback',
  'promotions'
];

tables.forEach(table => {
  app.get(`/${table}`, async (_req, res) => {
    try {
      const { rows } = await pool.query(`SELECT * FROM ${table}`);
      res.json(rows);
    } catch (err) {
      console.error(`Error fetching ${table}:`, err.message);
      res.status(500).json({ error: err.message });
    }
  });
});

/* ---------- API ALIASES FOR DROPDOWNS ---------- */
/*  These endpoints are used by the appointment form   */
/*  and return JSON arrays suitable for <select> lists  */

app.get('/api/clients',  async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT client_id, first_name, last_name FROM clients ORDER BY first_name');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/services', async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT service_id, service_name FROM services WHERE active = \'Yes\' ORDER BY service_name');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/staff',    async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT staff_id, first_name, last_name FROM staff WHERE active = \'Yes\' ORDER BY first_name');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

/* ---------- TOTAL COUNTS ---------- */
const countTables = [
  'clients', 'services', 'staff', 'products',
  'appointments', 'payments', 'clientfeedback', 'promotions'
];

countTables.forEach(table => {
  app.get(`/total${table}`, async (_req, res) => {
    try {
      const { rows } = await pool.query(`SELECT COUNT(*) FROM ${table}`);
      res.json({ count: rows[0].count });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
});

/* ---------- INSERT ROUTES ---------- */
/*  (unchanged – keep all your existing POST routes)  */

// POST: Clients
app.post('/clients', async (req, res) => {
  const { client_id, first_name, last_name, phone, email, birth_date, join_date, client_notes } = req.body;
  try {
    await pool.query(
      `INSERT INTO clients (client_id,first_name,last_name,phone,email,birth_date,join_date,client_notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [client_id, first_name, last_name, phone, email, birth_date, join_date, client_notes]
    );
    res.status(201).json({ message: 'Client added' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST: Services
app.post('/services', async (req, res) => {
  const { service_id, service_name, description, duration_min, base_price, category, active } = req.body;
  try {
    await pool.query(
      `INSERT INTO services (service_id,service_name,description,duration_min,base_price,category,active)
       VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [service_id, service_name, description, duration_min, base_price, category, active]
    );
    res.status(201).json({ message: 'Service added' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST: Staff
app.post('/staff', async (req, res) => {
  const { staff_id, first_name, last_name, phone, email, hire_date, position, salary, active } = req.body;
  try {
    await pool.query(
      `INSERT INTO staff (staff_id,first_name,last_name,phone,email,hire_date,position,salary,active)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [staff_id, first_name, last_name, phone, email, hire_date, position, salary, active]
    );
    res.status(201).json({ message: 'Staff added' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST: Products
app.post('/products', async (req, res) => {
  const { product_id, product_name, brand, category, purchase_price, retail_price, quantity_in_stock } = req.body;
  try {
    await pool.query(
      `INSERT INTO products (product_id,product_name,brand,category,purchase_price,retail_price,quantity_in_stock)
       VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [product_id, product_name, brand, category, purchase_price, retail_price, quantity_in_stock]
    );
    res.status(201).json({ message: 'Product added' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST: Appointments
app.post('/appointments', async (req, res) => {
  const { appointment_id, client_id, service_id, staff_id, appointment_date, start_time, end_time, status } = req.body;
  try {
    await pool.query(
      `INSERT INTO appointments (appointment_id,client_id,service_id,staff_id,appointment_date,start_time,end_time,status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [appointment_id, client_id, service_id, staff_id, appointment_date, start_time, end_time, status]
    );
    res.status(201).json({ message: 'Appointment booked' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST: ServiceProducts
app.post('/serviceproducts', async (req, res) => {
  const { service_id, product_id, quantity_used } = req.body;
  try {
    await pool.query(
      `INSERT INTO serviceproducts (service_id,product_id,quantity_used)
       VALUES ($1,$2,$3)`,
      [service_id, product_id, quantity_used]
    );
    res.status(201).json({ message: 'Service-Product relation added' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST: StaffServices
app.post('/staffservices', async (req, res) => {
  const { staff_id, service_id } = req.body;
  try {
    await pool.query(
      `INSERT INTO staffservices (staff_id,service_id) VALUES ($1,$2)`,
      [staff_id, service_id]
    );
    res.status(201).json({ message: 'Staff-Service relation added' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST: Payments
app.post('/payments', async (req, res) => {
  const { payment_id, appointment_id, client_id, payment_date, payment_amount, payment_method, tip_amount } = req.body;
  try {
    await pool.query(
      `INSERT INTO payments (payment_id,appointment_id,client_id,payment_date,payment_amount,payment_method,tip_amount)
       VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [payment_id, appointment_id, client_id, payment_date, payment_amount, payment_method, tip_amount]
    );
    res.status(201).json({ message: 'Payment recorded' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST: ClientFeedback
app.post('/clientfeedback', async (req, res) => {
  const { feedback_id, client_id, appointment_id, rating, comments, feedback_date } = req.body;
  try {
    await pool.query(
      `INSERT INTO clientfeedback (feedback_id,client_id,appointment_id,rating,comments,feedback_date)
       VALUES ($1,$2,$3,$4,$5,$6)`,
      [feedback_id, client_id, appointment_id, rating, comments, feedback_date]
    );
    res.status(201).json({ message: 'Feedback submitted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST: Promotions
app.post('/promotions', async (req, res) => {
  const { promotion_id, promotion_name, description, discount_percent, start_date, end_date, applicable_services } = req.body;
  try {
    await pool.query(
      `INSERT INTO promotions (promotion_id,promotion_name,description,discount_percent,start_date,end_date,applicable_services)
       VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [promotion_id, promotion_name, description, discount_percent, start_date, end_date, applicable_services]
    );
    res.status(201).json({ message: 'Promotion added' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 6008;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

