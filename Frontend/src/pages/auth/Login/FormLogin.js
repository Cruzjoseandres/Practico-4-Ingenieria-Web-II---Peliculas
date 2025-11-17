import { useState } from "react";
import useAuthentication from "../../../../hooks/useAuthentication";

export const useLoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { doLogin } = useAuthentication();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username.trim() || !password.trim()) {
            setError("Todos los campos son requeridos");
            return;
        }

        const loginData = {
            username: username.trim(),
            password: password
        };

        doLogin(loginData);
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

