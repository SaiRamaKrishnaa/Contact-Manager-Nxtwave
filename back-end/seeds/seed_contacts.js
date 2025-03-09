/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
// seeds/seed_contacts.js
exports.seed = async function(knex) {
  // Deletes ALL existing entries in the contacts table
  await knex('contacts').del();
  // Inserts dummy contacts
  await knex('contacts').insert([
    { name: 'Sai Rama Krishna', email: 'sai@example.com', phone: '9955443322' },
    { name: 'Ramu', email: 'ramu@example.com', phone: '1122334455' },
    { name: 'shiva Sai Balaji', email: 'balaji@example.com', phone: '0099887766' },
    { name: 'Blessy Susan', email: 'Blessy@example.com', phone: '8877665544' }
  ]);
};
