import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAccessToken } from "../../utils/TokenUtilities";
import useAuthentication from "../../hooks/useAuthentication";

const Header = () => {
    const { doLogout, username } = useAuthentication();
    const onLogoutClick = () => {
        doLogout();
    }
    const token = getAccessToken();
    return (
        <Navbar bg="primary" data-bs-theme="dark" expand="lg" >
            <Container>
                <Link className="navbar-brand" to="/">MovieReviews</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link" to="/">Películas</Link>
                        {token && (
                            <>
                                <Link className="nav-link" to="/movies/create">Agregar Película</Link>
                                <NavDropdown title={username || "Usuario"} id="user-dropdown">
                                    <Link className="dropdown-item" to="/my-reviews">
                                        Mis Reviews
                                    </Link>
                                    <NavDropdown.Divider />
                                    <button className="dropdown-item" onClick={onLogoutClick}>
                                        Cerrar sesión
                                    </button>
                                </NavDropdown>
                            </>
                        )}
                        {!token && (
                            <>
                                <Link className="nav-link" to="/login">Iniciar sesión</Link>
                                <Link className="nav-link" to="/register">Registrarse</Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;

