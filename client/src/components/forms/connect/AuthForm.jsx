//AuthForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { useUser } from "../../../context/UserContext";
import Forgot from './Forgot';

const AuthForm = ({ formType, onFormSwitch, onClose, setRole, setStatus }) => {
    const { loginUser, registerUser, errorMessage } = useUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showModal, setShowModal] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche la soumission du formulaire par défaut
        if (formType === "register" && password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas");
            return;
        }
        try {
            if (formType === "register") {
                const data = await registerUser({ username, email, password });
                console.log(data); // Log the response data
                alert("Utilisateur enregistré avec succès");
                onFormSwitch("login"); // Passer au mode connexion après l'inscription réussie
            } else if (formType === "login") {
                const { user } = await loginUser(email, password); // Déstructuration pour récupérer l'utilisateur
                console.log("Données de l'utilisateur :", user); // Log des informations de l'utilisateur
                onClose();
                // Redirection en fonction du rôle de l'utilisateur
                if (user.role === "admin") {
                    navigate('/dashboard'); // Redirigez vers le tableau de bord si l'utilisateur est admin
                } else {
                    navigate('/'); // Redirigez vers la page d'accueil si l'utilisateur est normal
                }

                // Fermer le formulaire après la connexion réussie
                setShowModal(false); // Cela devrait fermer le modal
                onFormSwitch("login"); // Cela devrait changer le type de formulaire si nécessaire
            }
        } catch (err) {
            console.error("Error during registration/login:", err);
            alert("Une erreur s'est produite. Veuillez réessayer.");
        }
    };

    const handleFormSwitch = (type) => {
        console.log("Changement de formulaire :", type);
        if (type === "login") {
            setShowModal(false); // Cela ferme le modal
        }
        setFormType(type); // Change le type de formulaire si nécessaire
    };
    return (
        <div className="auth-wrapper">
            <h3>{formType === "login" ? "Connexion" : formType === "register" ? "Inscription" : "Mot de passe oublié"}</h3>
            {formType === "forgot" ? (
                <Forgot onBack={() => onFormSwitch("login")} />
            ) : (
                <form className="auth-form" onSubmit={handleSubmit}>
                    {formType === "register" && (
                        <div className="input-group name">
                            <input
                                type="text"
                                className="field"
                                value={username}
                                placeholder="Entrez votre nom"
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    <div className="input-group email">
                        <input
                            type="email"
                            className="field"
                            value={email}
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group password">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="field"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span onClick={() => setShowPassword(!showPassword)}>
                            <Icon icon={showPassword ? eye : eyeOff} />
                        </span>
                    </div>
                    {formType === "register" && (
                        <div className="input-group confirm-password">
                            <input
                                type="password"
                                className="field"
                                placeholder="Confirmez le mot de passe"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    <button type="submit" className="btn submit">
                        {formType === "login" ? "Je me connecte" : "Je m'inscris"}
                    </button>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </form>
            )}
            <div className="options">
                {formType === "login" && (
                    <>
                        <button
                            type="button"
                            className="btn option register"
                            onClick={() => onFormSwitch("register")}
                        >
                            Je crée mon compte
                        </button>
                        <button
                            type="button"
                            className="btn option forgot"
                            onClick={() => onFormSwitch("forgot")}
                        >
                            J'ai oublié mon mot de passe
                        </button>
                    </>
                )}
                {formType === "register" && (
                    <button
                        type="button"
                        className="btn option back"
                        onClick={() => onFormSwitch("login")}
                    >
                        Retour à la connexion
                    </button>
                )}
            </div>
        </div>
    );
};

export default AuthForm;