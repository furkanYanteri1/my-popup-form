import React, { useState } from 'react';
import axios from 'axios';

const PopupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    consent: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      const response = await axios.post('/api/submit', formData);
      setSuccess('Form submitted successfully!');
      console.log('Response:', response.data);
    } catch (err) {
      console.error('Error:', err);
      setError('There was an error submitting the form.');
    }
  };

  return (
    <div id="popup-form" className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <form id="embedded-form" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input type="text" name="name" className="w-full px-4 py-2 border rounded-lg" required value={formData.name} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" name="email" className="w-full px-4 py-2 border rounded-lg" required value={formData.email} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input type="tel" name="phone" className="w-full px-4 py-2 border rounded-lg" required value={formData.phone} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input type="checkbox" name="consent" className="mr-2" required checked={formData.consent} onChange={handleChange} />
              I agree to the terms and conditions
            </label>
          </div>
          {error && <div className="mb-4 text-red-500">{error}</div>}
          {success && <div className="mb-4 text-green-500">{success}</div>}
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
