import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSignupMutation } from '../state/user/api';

export const useSignup = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [signup, result] = useSignupMutation();

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await signup(formData)
      .unwrap()
      .then(() => navigate('/login'))
      .catch((rejected) => console.log(rejected));
  };

  return {
    loading: result.isLoading,
    error: result?.error?.data?.detail,
    handleInputChange,
    handleFormSubmit,
  };
};
