import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneCode: '',
    phoneNumber: '',
    country: '',
    city: '',
    panNumber: '',
    aadharNumber: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    panNumber: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    aadharNumber: /^\d{12}$/,
    phoneNumber: /^\d{10}$/,
    phoneCode: /^\+\d{1,4}$/
  };

  const validateField = (name, value) => {
    if (!value || !value.trim()) {
      return 'This field is required';
    }
    switch (name) {
      case 'email':
        return patterns.email.test(value) ? '' : 'Please enter a valid email address';
      case 'password':
        return patterns.password.test(value) ? '' : 'Password must be at least 8 characters with letters and numbers';
      case 'panNumber':
        return patterns.panNumber.test(value) ? '' : 'Please enter a valid PAN number (e.g., ABCDE1234F)';
      case 'aadharNumber':
        return patterns.aadharNumber.test(value) ? '' : 'Please enter a valid 12-digit Aadhar number';
      case 'phoneNumber':
        return patterns.phoneNumber.test(value) ? '' : 'Please enter a valid 10-digit phone number';
      case 'phoneCode':
        return patterns.phoneCode.test(value) ? '' : 'Please enter a valid country code (e.g., +91)';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (value.trim() || errors[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    if (Object.keys(newErrors).length === 0) {
      window.alert('Form submitted successfully!');
      navigate('/success', { state: formData });
    } else {
      setErrors(newErrors);
    }
  };

  const isFormValid = () => {
    const allFieldsFilled = Object.values(formData).every(value => value && value.trim() !== '');
    const hasErrors = Object.values(errors).some(error => error && error.length > 0);
    
    console.log('Form validation:', { allFieldsFilled, hasErrors, formData, errors });
    
    return allFieldsFilled && !hasErrors;
  };

  return (
    <div className="registration-form-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={errors.firstName ? 'error' : ''}
          />
          {errors.firstName && <span className="error-message">{errors.firstName}</span>}
        </div>
        <div className="form-group">
          <label>Last Name *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={errors.lastName ? 'error' : ''}
          />
          {errors.lastName && <span className="error-message">{errors.lastName}</span>}
        </div>
        <div className="form-group">
          <label>Username *</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? 'error' : ''}
          />
          {errors.username && <span className="error-message">{errors.username}</span>}
        </div>
        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Password *</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-password"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>
        <div className="form-group">
          <label>Phone Number *</label>
          <div className="phone-input">
            <input
              type="text"
              name="phoneCode"
              placeholder="+91"
              value={formData.phoneCode}
              onChange={handleChange}
              className={errors.phoneCode ? 'error' : ''}
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={errors.phoneNumber ? 'error' : ''}
            />
          </div>
          {errors.phoneCode && <span className="error-message">{errors.phoneCode}</span>}
          {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
        </div>
        <div className="form-group">
          <label>Country *</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={errors.country ? 'error' : ''}
          >
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Canada">Canada</option>
          </select>
          {errors.country && <span className="error-message">{errors.country}</span>}
        </div>
        <div className="form-group">
          <label>City *</label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={errors.city ? 'error' : ''}
          >
            <option value="">Select City</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Chennai">Chennai</option>
          </select>
          {errors.city && <span className="error-message">{errors.city}</span>}
        </div>
        <div className="form-group">
          <label>PAN Number *</label>
          <input
            type="text"
            name="panNumber"
            value={formData.panNumber}
            onChange={handleChange}
            className={errors.panNumber ? 'error' : ''}
          />
          {errors.panNumber && <span className="error-message">{errors.panNumber}</span>}
        </div>
        <div className="form-group">
          <label>Aadhar Number *</label>
          <input
            type="text"
            name="aadharNumber"
            value={formData.aadharNumber}
            onChange={handleChange}
            className={errors.aadharNumber ? 'error' : ''}
          />
          {errors.aadharNumber && <span className="error-message">{errors.aadharNumber}</span>}
        </div>
        <button type="submit" disabled={!isFormValid()}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm; 