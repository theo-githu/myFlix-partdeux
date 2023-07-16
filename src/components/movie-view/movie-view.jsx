import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, Col, Row, Card } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies, user, setUser, token }) => {
  const { movieId } = useParams();
  const [ isFavorite, setIsFavorite ] = useState(false);

  useEffect(() => {
    const isFavorite = user.FavoriteMovies.includes(movieId)
    setIsFavorite(isFavorite)
  }, []);

  const removeFavorite = () => {
    fetch(`https://movieflix-899d9c6c8969.herokuapp.com/users/${user.Username}/${movieId}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
      }
    }).then((response) => {
      if (response.ok) {
          return response.json()
      }
    }).then((data) => {
      setIsFavorite(false);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    })
  };

  const addToFavorite = () => {
    fetch(`https://movieflix-899d9c6c8969.herokuapp.com/users/${user.Username}/${movieId}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
      }
    }).then((response) => {
      if (response.ok) {
          return response.json()
      }
    }).then((data) => {
      setIsFavorite(true);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    })
  }

  const movie = movies.find((m) => m._id === movieId);

  return (
    <Container>
      <Card className="mt-1 mb-1 h-100 bg-secondary text-white" >
        <Card.Body>
          <img src={movie.ImageURL} variant="top" className="w-100"/>
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

        {isFavorite ? (
                <Button onClick={removeFavorite}>Remove from favorites</Button>
            ) : (
                <Button onClick={addToFavorite}>Add to favorites</Button>
        )}

        <Card.Footer className={"d-flex flex-row justify-content-between align-items-baseline mt-auto"}>
          <Link to={`/`} className={"text-start"}>
            <Button className="back-button" variant="primary" size="sm">Back</Button>
          </Link>            
        </Card.Footer>
      </Card>
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