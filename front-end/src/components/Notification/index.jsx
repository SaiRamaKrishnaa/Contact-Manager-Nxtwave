const Notification = ({ message, type }) => {
  const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-600';
  
  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-up`}>
      {message}
    </div>
  );
};

export default Notification