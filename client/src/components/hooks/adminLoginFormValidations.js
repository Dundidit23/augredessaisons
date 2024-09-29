import { useState } from 'react';

export const useFormValidation = (initialState, loginType) => {
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const validate = () => {
    let tempErrors = {};

    if (loginType === 'admin') {
      if (!data.username) {
        tempErrors.username = "Username is required";
      }
    } else if (loginType === 'customer') {
      if (!data.email) {
        tempErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        tempErrors.email = "Email is invalid";
      }
    }

    if (!data.password) {
      tempErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  return {
    data,
    errors,
    handleChange,
    validate,
  };
};