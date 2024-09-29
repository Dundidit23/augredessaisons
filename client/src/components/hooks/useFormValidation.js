import { useState } from 'react';

export const useFormValidation = (initialState) => {
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validate = (validations) => {
    let results = [];
    let validationErrors = {};

    const validEmail = (str) => {
      let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      return regex.test(str);
    };

    const minLength = (str, length) => {
      return str.length < length;
    };

    Object.entries(validations).forEach(([key, value]) => {
      if (value.isRequired && !data[key]) {
        results.push({ [key]: `Veuillez saisir votre ${key}` });
      } else if (value.isEmail && !validEmail(data[key])) {
        results.push({ [key]: `Votre ${key} doit être valide` });
      } else if (value.minLength && minLength(data[key], value.minLength)) {
        results.push({ [key]: `Le mot de passe doit avoir au moins ${value.minLength} caractères.` });
      }
    });

    if (results.length > 0) {
      validationErrors = Object.assign({}, ...results);
      setErrors(validationErrors);
      return { errors: validationErrors };
    }

    setErrors({});
    return null;
  };

  return { data, errors, handleChange, validate };
};