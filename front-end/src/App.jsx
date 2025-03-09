// App.js
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ThemeContext, ThemeProvider } from './context/ThemeContext';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import Toast from './components/Toast';
import './styles/main.css';

const API_URL = 'https://your-api-endpoint.com/contacts';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { theme } = useContext(ThemeContext);
  const [showForm, setShowForm] = useState(false);
  const [editContact, setEditContact] = useState(null);

  const fetchContacts = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, {
        params: {
          page,
          search: searchQuery,
          limit: 10
        }
      });
      setContacts(response.data.contacts);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts(currentPage);
  }, [currentPage, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFormSubmit = async (contactData) => {
    try {
      if (editContact) {
        await axios.put(`${API_URL}/${editContact.id}`, contactData);
      } else {
        await axios.post(API_URL, contactData);
      }
      fetchContacts(currentPage);
      setShowForm(false);
      setEditContact(null);
    } catch (err) {
      setError('Failed to save contact');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchContacts(currentPage);
    } catch (err) {
      setError('Failed to delete contact');
    }
  };

  return (
    <div className={`app ${theme}`}>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Contact Manager</h1>
          <SearchBar onSearch={handleSearch} />
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {showForm ? 'Close Form' : 'Add Contact'}
          </button>
        </div>

        {showForm && (
          <ContactForm
            onSubmit={handleFormSubmit}
            editContact={editContact}
            onCancel={() => {
              setShowForm(false);
              setEditContact(null);
            }}
          />
        )}

        {error && <Toast message={error} type="error" onClose={() => setError('')} />}
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
            <ContactList
              contacts={contacts}
              onEdit={(contact) => {
                setEditContact(contact);
                setShowForm(true);
              }}
              onDelete={handleDelete}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);