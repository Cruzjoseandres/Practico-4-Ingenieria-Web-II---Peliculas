import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../../../services/AuthService";

export const useRegisterForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username.trim() || !password.trim()) {
            setError("Todos los campos son requeridos");
            return;
        }

        const registerData = {
            username: username.trim(),
            password: password
        };

        register(registerData)
            .then(() => {
                alert("Usuario registrado exitosamente");
                navigate("/login");
            })
            .catch((error) => {
                console.error("Error al registrar:", error);
                setError("Error al registrar el usuario. El nombre de usuario puede estar en uso.");
            });
    };

    return {
        username,
        setUsername,
        password,
        setPassword,
        error,
        handleSubmit
    };
};

