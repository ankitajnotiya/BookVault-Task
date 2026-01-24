import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { X, User } from 'lucide-react';

export function ProfileFormModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    position: '',
    location: '',
    joinDate: '',
  });

  const [errors, setErrors] = useState({});

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
    
    // Position validation
    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
    } else if (formData.position.trim().length < 2) {
      newErrors.position = 'Position must be at least 2 characters';
    } else if (formData.position.trim().length > 100) {
      newErrors.position = 'Position must be less than 100 characters';
    }

    // Phone validation (optional)
    if (formData.phone && formData.phone.trim()) {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(formData.phone.trim())) {
        newErrors.phone = 'Invalid phone number format';
      } else if (formData.phone.replace(/[^\d]/g, '').length < 10) {
        newErrors.phone = 'Phone number must have at least 10 digits';
      } else if (formData.phone.replace(/[^\d]/g, '').length > 15) {
        newErrors.phone = 'Phone number is too long';
      }
    }

    // Bio validation (optional)
    if (formData.bio && formData.bio.length > 500) {
      newErrors.bio = 'Bio must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSave(formData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="p-0 max-w-md border-0 bg-white overflow-hidden rounded-xl shadow-xl fixed left-1/2 top-20 h-auto max-h-[70vh] m-0 transform -translate-x-1/2 transition-all duration-300 ease-in-out">
        {/* Header Section */}
        <div className="bg-gray-50 border-b border-gray-200 p-4 text-gray-800">
          <div className="flex justify-between items-center">
            <div>
              <DialogTitle className="text-lg font-semibold">
                Edit Profile
              </DialogTitle>
              <DialogDescription className="text-gray-600 text-sm mt-1">
                Update your information
              </DialogDescription>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 max-h-[60vh] overflow-y-auto">
          <div className="space-y-3">
            
            {/* First Name */}
            <div>
              <Label className="text-gray-700 text-sm font-medium">First Name *</Label>
              <Input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John"
                className={`mt-1 h-9 border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.firstName 
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50' 
                    : 'border-gray-300'
                }`} />
              {errors.firstName && <span className="text-xs text-red-500 mt-1 font-medium">{errors.firstName}</span>}
            </div>

            {/* Last Name */}
            <div>
              <Label className="text-gray-700 text-sm font-medium">Last Name *</Label>
              <Input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe"
                className={`mt-1 h-9 border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.lastName 
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50' 
                    : 'border-gray-300'
                }`} />
              {errors.lastName && <span className="text-xs text-red-500 mt-1 font-medium">{errors.lastName}</span>}
            </div>

            {/* Email */}
            <div>
              <Label className="text-gray-700 text-sm font-medium">Email *</Label>
              <Input name="email" value={formData.email} onChange={handleChange} placeholder="john.doe@example.com"
                className={`mt-1 h-9 border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.email 
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50' 
                    : 'border-gray-300'
                }`} />
              {errors.email && <span className="text-xs text-red-500 mt-1 font-medium">{errors.email}</span>}
            </div>

            {/* Phone & Position */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-gray-700 text-sm font-medium">Phone</Label>
                <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 555 123-4567"
                  className={`mt-1 h-9 border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.phone 
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50' 
                      : 'border-gray-300'
                  }`} />
                {errors.phone && <span className="text-xs text-red-500 mt-1 font-medium">{errors.phone}</span>}
              </div>
              <div>
                <Label className="text-gray-700 text-sm font-medium">Position *</Label>
                <Input name="position" value={formData.position} onChange={handleChange} placeholder="Manager"
                  className={`mt-1 h-9 border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.position 
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50' 
                      : 'border-gray-300'
                  }`} />
                {errors.position && <span className="text-xs text-red-500 mt-1 font-medium">{errors.position}</span>}
              </div>
            </div>

            {/* Bio */}
            <div>
              <Label className="text-gray-700 text-sm font-medium">Bio</Label>
              <Textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Tell us about yourself..."
                rows={3} className={`mt-1 border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none ${
                  errors.bio 
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50' 
                    : 'border-gray-300'
                }`} />
              {errors.bio && <span className="text-xs text-red-500 mt-1 font-medium">{errors.bio}</span>}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
            <Button type="button" onClick={onClose} 
                className="flex-1 h-9 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md">
              Close
            </Button>
            <Button type="submit" 
                className="flex-1 h-9 bg-blue-600 text-white hover:bg-blue-700 rounded-md">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
