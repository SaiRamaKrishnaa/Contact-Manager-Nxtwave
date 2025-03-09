const ContactList = ({ contacts, onEdit, onDelete }) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 "
        >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {contact.name}
            </h3>
            <p className="text-gray-600 mb-1">{contact.email}</p>
            <p className="text-gray-600">{contact.phone}</p>
            <div className="mt-4 flex space-x-2">
            <button
              onClick={() => onEdit(contact)}
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(contact.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Delete
            </button>
          </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default ContactList;