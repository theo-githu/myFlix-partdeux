import PropTypes from "prop-types";
import { Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router"
import { MovieCard } from "../movie-card/movie-card";
import { useEffect, useState } from "react";

export const MovieView = ({ movie, user, token, updateUser }) => {
    const { movieId } = useParams();

    const movie = movies.find((m) => movie._id === movieId);

    const [isFavorite, setIsFavorite] = useState(
        user.favoriteMovies.includes(movie._id));

    useEffect(() => {
        setIsFavorite(user.favoriteMovies.includes(movie._id));
    }, [movieId])

    const addFavorite = () => {
      fetch(`https://movieflix-899d9c6c8969.herokuapp.com/users/${user.username}/movies/${movieId}`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              alert("Failed");
              return false;
          }
      })
      .then(user => {
          if (user) {
              alert("Successfully added to favorites");
              setIsFavorite(true);
              updateUser(user);
          }
      })
      .catch(e => {
          alert(e);
      });
  }

  const removeFavorite = () => {
    fetch(`https://movieflix-899d9c6c8969.herokuapp.com/users/${user.username}/movies/${movieId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            alert("Failed");
            return false;
        }
    })
    .then(user => {
        if (user) {
            alert("Successfully deleted from favorites");
            setIsFavorite(false);
            updateUser(user);
        }
    })
    .catch(e => {
        alert(e);
    });
  }

  return (
    <Container>
      <Row>
        <Card>
          <Card.Body>
            <img src={movie.ImageURL} variant="top" className="w-100 text-center"/>
            <Card.Title className="fw-bold fs-2 mt-3 mb-3">
                {movie.Title}
            </Card.Title>
            <Card.Text>
                <span className="me-1 fw-bold">Description: </span>
                <span>{movie.Description}</span>
            </Card.Text>
            <Card.Text>
                <span className="me-1 fw-bold">Genre: </span>
                <span>{movie.Genre.Name}</span>
            </Card.Text>
            <Card.Text>
                <span className="me-1 fw-bold">Director: </span>
                <span>{movie.Director.Name}</span>
            </Card.Text>
            <Card.Text>
                    <span className="me-1 fw-bold">IMDb Rating:  </span>
                    <span>{movie.Rating}</span>
                </Card.Text>
          </Card.Body>
          <Card.Footer className={"d-flex flex-row justify-content-between align-items-baseline mt-auto"}>
            <Link to={`/`} className={"text-start"}>
                <Button className="back-button" variant="primary" size="sm">Back</Button>
            </Link>
            {isFavorite ? 
                <Button variant="danger" className="ms-2" onClick={removeFavorite}>Remove from favorites</Button>
                : <Button variant="success" className="ms-2" onClick={addFavorite}>Add to favorites</Button>
            }                   
          </Card.Footer>
        </Card>
      </Row>
    </Container>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImageURL: PropTypes.string.isRequired,
      Rating: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
          Name: PropTypes.string.isRequired,
          Description: PropTypes.string.isRequired
      }),
      Director: PropTypes.shape({
          Name: PropTypes.string.isRequired,
          Bio: PropTypes.string.isRequired,
      })
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};