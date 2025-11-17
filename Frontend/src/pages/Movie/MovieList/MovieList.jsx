import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useMovieList } from "./MovieList";

const MovieList = () => {
  const { movies, loading, handleMovieClick } = useMovieList();

  if (loading) {
    return (
      <Container className="mt-5">
        <h2>Cargando películas...</h2>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Películas Disponibles</h1>
      <Row>
        {movies.map((movie) => (
          <Col key={movie.id} md={4} className="mb-4">
            <Card
              style={{ cursor: "pointer" }}
              onClick={() => handleMovieClick(movie.id)}
            >
              <Card.Img
                variant="top"
                src={`http://localhost:3000${movie.imageUrl}`}
                alt={movie.title}
                style={{ height: "300px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.description.substring(0, 100)}...</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleMovieClick(movie.id)}
                >
                  Ver Detalle
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MovieList;
