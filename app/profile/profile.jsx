import { Header } from '../../componet/header';
import { Footer } from '../../componet/footer';
import { useState } from 'react';

export default function ProfilePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    birthDate: '',
    occupation: '',
    bio: '',
  });

  const validateForm = () => {
    const newErrors = {};
    
    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    } else if (formData.firstName.trim().length > 50) {
      newErrors.firstName = 'First name must be less than 50 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.firstName.trim())) {
      newErrors.firstName = 'First name can only contain letters';
    }
    
    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    } else if (formData.lastName.trim().length > 50) {
      newErrors.lastName = 'Last name must be less than 50 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.lastName.trim())) {
      newErrors.lastName = 'Last name can only contain letters';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Invalid email format';
      }
    }
    
    // Phone validation (now required)
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(formData.phone.trim())) {
        newErrors.phone = 'Invalid phone number format';
      } else if (formData.phone.replace(/[^\d]/g, '').length < 10) {
        newErrors.phone = 'Phone number must have at least 10 digits';
      } else if (formData.phone.replace(/[^\d]/g, '').length > 15) {
        newErrors.phone = 'Phone number is too long';
      }
    }
    
    // Address validation (now required)
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    } else if (formData.address.trim().length > 200) {
      newErrors.address = 'Address must be less than 200 characters';
    }
    
    // City validation (now required)
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    } else if (formData.city.trim().length > 50) {
      newErrors.city = 'City must be less than 50 characters';
    }
    
    // Country validation (now required)
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    } else if (formData.country.trim().length > 50) {
      newErrors.country = 'Country must be less than 50 characters';
    }
    
    // Zip Code validation (now required)
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'Zip code is required';
    } else {
      const zipRegex = /^[\d\s\-A-Za-z]+$/;
      if (!zipRegex.test(formData.zipCode.trim())) {
        newErrors.zipCode = 'Invalid zip code format';
      } else if (formData.zipCode.replace(/[^\dA-Za-z]/g, '').length < 3) {
        newErrors.zipCode = 'Zip code must be at least 3 characters';
      } else if (formData.zipCode.replace(/[^\dA-Za-z]/g, '').length > 10) {
        newErrors.zipCode = 'Zip code is too long';
      }
    }
    
    // Birth Date validation (now required)
    if (!formData.birthDate.trim()) {
      newErrors.birthDate = 'Birth date is required';
    } else {
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      const minDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDay());
      
      if (birthDate > today) {
        newErrors.birthDate = 'Birth date cannot be in the future';
      } else if (birthDate < minDate) {
        newErrors.birthDate = 'Birth date seems unrealistic';
      }
    }
    
    // Occupation validation (now required)
    if (!formData.occupation.trim()) {
      newErrors.occupation = 'Occupation is required';
    } else if (formData.occupation.trim().length > 100) {
      newErrors.occupation = 'Occupation must be less than 100 characters';
    }
    
    // Bio validation (now required)
    if (!formData.bio.trim()) {
      newErrors.bio = 'Bio is required';
    } else if (formData.bio.length > 500) {
      newErrors.bio = 'Bio must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log('Profile data:', formData);
    // Here you would save the profile data
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <h1 className="text-xl font-semibold text-gray-900">Profile Form</h1>
              <p className="text-sm text-gray-600 mt-1">Update your personal information</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Personal Information */}
              <div>
                <h2 className="text-base font-medium text-gray-900 mb-3">Personal Information</h2>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                        errors.firstName 
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50' 
                          : 'border-gray-300'
                      }`}
                    />
                    {errors.firstName && <span className="text-xs text-red-500 mt-1 font-medium">{errors.firstName}</span>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                        errors.lastName 
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50' 
                          : 'border-gray-300'
                      }`}
                    />
                    {errors.lastName && <span className="text-xs text-red-500 mt-1 font-medium">{errors.lastName}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                        errors.email 
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50' 
                          : 'border-gray-300'
                      }`}
                    />
                    {errors.email && <span className="text-xs text-red-500 mt-1 font-medium">{errors.email}</span>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                        errors.phone 
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50' 
                          : 'border-gray-300'
                      }`}
                    />
                    {errors.phone && <span className="text-xs text-red-500 mt-1 font-medium">{errors.phone}</span>}
                  </div>
                </div>

                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Birth Date *</label>
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      errors.birthDate 
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50' 
                        : 'border-gray-300'
                    }`}
                  />
                  {errors.birthDate && <span className="text-xs text-red-500 mt-1 font-medium">{errors.birthDate}</span>}
                </div>

                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Occupation *</label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      errors.occupation 
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50' 
                        : 'border-gray-300'
                    }`}
                  />
                  {errors.occupation && <span className="text-xs text-red-500 mt-1 font-medium">{errors.occupation}</span>}
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h2 className="text-base font-medium text-gray-900 mb-3">Address Information</h2>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                        errors.address 
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50' 
                          : 'border-gray-300'
                      }`}
                    />
                    {errors.address && <span className="text-xs text-red-500 mt-1 font-medium">{errors.address}</span>}
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                          errors.city 
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50' 
                            : 'border-gray-300'
                        }`}
                      />
                      {errors.city && <span className="text-xs text-red-500 mt-1 font-medium">{errors.city}</span>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                          errors.country 
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50' 
                            : 'border-gray-300'
                        }`}
                      />
                      {errors.country && <span className="text-xs text-red-500 mt-1 font-medium">{errors.country}</span>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code *</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                          errors.zipCode 
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50' 
                            : 'border-gray-300'
                        }`}
                      />
                      {errors.zipCode && <span className="text-xs text-red-500 mt-1 font-medium">{errors.zipCode}</span>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <h2 className="text-base font-medium text-gray-900 mb-3">About Me</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio *</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none ${
                      errors.bio 
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50' 
                        : 'border-gray-300'
                    }`}
                    placeholder="Tell us about yourself..."
                  />
                  {errors.bio && <span className="text-xs text-red-500 mt-1 font-medium">{errors.bio}</span>}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
