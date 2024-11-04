//Forgot.jsx
import React, { useState } from "react";
import { useUser } from "../../../context/UserContext"; // Assurez-vous que cette importation est correcte
import api from "../../../services/api"; // Importez votre instance d'API

const Forgot = ({ onBack }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // Pour afficher des messages d'erreur ou de succès

  const handleForgot = async (e) => {
    e.preventDefault();
    try {
      // Envoyer la demande de réinitialisation de mot de passe
      const response = await api.post('/api/users/reset-password', {
        email,
      });

      if (response.ok) {
        setMessage("Un lien de réinitialisation a été envoyé à votre adresse e-mail.");
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Erreur lors de l'envoi de l'e-mail.");
      }
    } catch (error) {
      console.error("Erreur lors de la demande de réinitialisation :", error);
      setMessage("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <div className="auth-wrapper">
      <h3>Mot de passe oublié</h3>
      <form className="auth-form" onSubmit={handleForgot}>
        <div className="input-group email">
          <input
            type="email"
            className="field"
            id="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required // Ajoutez l'attribut required pour une validation de formulaire
          />
        </div>
        <button type="submit" className="btn submit">
          Réinitialiser le mot de passe
        </button>
        <button type="button" className="btn back" onClick={onBack}>
          Retour à la connexion
        </button>
      </form>
      {message && <p>{message}</p>} {/* Affichez le message d'erreur ou de succès */}
    </div>
  );
};

export default Forgot;