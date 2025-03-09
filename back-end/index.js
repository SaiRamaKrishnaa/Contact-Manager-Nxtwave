require('dotenv').config();
const express = require('express');
const cors = require('cors');
const knex = require('knex');

const app = express();
app.use(express.json());
app.use(cors());

// Initialize Knex for SQLite3
const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './data/contacts.db'
  },
  useNullAsDefault: true
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Get all contacts
app.get('/contacts', async (req, res) => {
    try {
      const contacts = await db('contacts').select();
      res.json(contacts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
// Get a single contact by ID
app.get('/contacts/:id', async (req, res) => {
    try {
      const contact = await db('contacts').where({ id: req.params.id }).first();
      if (contact) res.json(contact);
      else res.status(404).json({ message: 'Contact not found' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
// Add a new contact
app.post('/contacts', async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'Name, email, and phone are required' });
    }
    try {
      const [id] = await db('contacts').insert({ name, email, phone });
      res.status(201).json({ id, name, email, phone });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
// Update a contact by ID
app.put('/contacts/:id', async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'Name, email, and phone are required' });
    }
    try {
      await db('contacts').where({ id: req.params.id }).update({ name, email, phone });
      res.json({ id: req.params.id, name, email, phone });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
// Delete a contact by ID
app.delete('/contacts/:id', async (req, res) => {
    try {
      const count = await db('contacts').where({ id: req.params.id }).del();
      if (count) res.json({ message: 'Contact deleted successfully' });
      else res.status(404).json({ message: 'Contact not found' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
      