import { useState, useEffect } from 'react';
import axios from 'axios';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import Notification from './components/Notification';

const API_URL = 'http://localhost:3000/contacts'; 

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = async () => {
    try {
      const response = await axios.get(API_URL);
      setContacts(response.data);
    } catch (error) {
      showNotification('Error fetching contacts', 'error');
    }
  };

  const addContact = async (contact) => {
    try {
      const response = await axios.post(API_URL, contact);
      setContacts([...contacts, response.data]);
      showNotification('Contact added successfully', 'success');
      setShowForm(false);
    } catch (error) {
      showNotification('Error adding contact', 'error');
    }
  };

  const updateContact = async (contact) => {
    try {
      const response = await axios.put(`${API_URL}/${contact.id}`, contact);
      setContacts(contacts.map(c => c.id === contact.id ? response.data : c));
      showNotification('Contact updated successfully', 'success');
      setShowForm(false);
    } catch (error) {
      showNotification('Error updating contact', 'error');
    }
  };

  const deleteContact = async (id) => {
    
    try {
      await axios.delete(`${API_URL}/${id}`);
      setContacts(contacts.filter(c => c.id !== id));
      showNotification('Contact deleted successfully', 'success');
    } catch (error) {
      showNotification('Error deleting contact', 'error');
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className=" mx-auto p-4 min-h-screen bg-gray-50 flex flex-col items-center">
      <div className='flex flex-col justify-center items-center'>
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center animate-fade-in">
        Contact Manager
      </h1>

      <button
        onClick={() => {
          setSelectedContact(null);
          setShowForm(true);
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-6 transition-all duration-300 transform hover:scale-105"
      >
        Add Contact
      </button>
      </div>
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}

      {showForm && (
        <ContactForm
          contact={selectedContact}
          onSave={selectedContact ? updateContact : addContact}
          onCancel={() => setShowForm(false)}
        />
      )}

      <ContactList
        contacts={contacts}
        onEdit={(contact) => {
          setSelectedContact(contact);
          setShowForm(true);
        }}
        onDelete={deleteContact}
      />
    </div>
  );
};

export default App;