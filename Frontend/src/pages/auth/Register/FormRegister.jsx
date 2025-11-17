import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useRegisterForm } from "./FormRegister";

const FormRegister = () => {
    const {
        username,
        setUsername,
        password,
        setPassword,
        error,
        handleSubmit
    } = useRegisterForm();

    return (
        <Container className="mt-5 d-flex justify-content-center">
            <Card style={{ width: '500px' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Registro</h2>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Elige un nombre de usuario"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Crea una contraseña"
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            Registrarse
                        </Button>
                    </Form>

                    <div className="text-center mt-3">
                        <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default FormRegister;

