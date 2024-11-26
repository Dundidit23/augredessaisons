import React, { useState, useEffect } from 'react';
import { sendMessage } from '../../services/api'; // Assurez-vous que la fonction est bien importée

const ContactForm = ({ subject = '', onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: subject || '', // Si un sujet est passé via props, l'utiliser
    content: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Appel API pour envoyer le message
      const response = await sendMessage(formData);
      if (response) {
        setSuccess(true);
        setError(null); // Réinitialiser l'erreur si tout va bien
        setFormData({ name: '', email: '', subject: '', content: '' }); // Réinitialiser le formulaire
      }
    } catch (error) {
      setError('Erreur lors de l\'envoi du message');
      console.error('Erreur lors de l\'envoi du message :', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Contactez-nous</h2>
      {success && <p>Votre message a été envoyé avec succès !</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label htmlFor="name">Nom</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="subject">Sujet</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}  // Utilisez formData.subject ici
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="content">Message</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Envoyer</button>
    </form>
  );
};

export default ContactForm;
