import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';

import './movie-card.scss';

import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Container className="movieContainer">
        <Row>
          <Col>
            <CardGroup>
              <Card className="movieCard text-center">
                <Card.Img
                  className="cardImage"
                  variant="top"
                  src={movie.image}
                />
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Text>{movie.description}</Card.Text>
                  <Link to={`/movies/${movie._id}`}>
                    <Button className="card-button" variant="primary">
                      Open
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    // Genre: PropTypes.shape({
    //   Name: ...
    //   ...
    // })
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
