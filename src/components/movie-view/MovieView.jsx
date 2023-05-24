import React from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import './movie-view.scss';

export class MovieView extends React.Component {
  handleFavorite = (movieId, action) => {
    // const { user, favoriteMovies } = this.state;
    const accessToken = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (accessToken !== null && user !== null) {
      // Add MovieID to Favorites
      if (action === 'add') {
        // this.setState({ favoriteMovies: [...favoriteMovies, movieId] });
        axios
          .post(
            `https://fellini-api.onrender.com/users/${user}/movies/${movieId}`,
            {},
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          .then((res) => {
            alert(`Movie added to ${user} favorite movies`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  render() {
    const { movie, onBackClick, handleFavorite } = this.props;

    return (
      <div className="movie-view">
        <Button onClick={() => this.handleFavorite(movie._id, 'add')}>
          FAVORITE
        </Button>
        <div className="movie-poster">
          <img src={movie.imageURL} />
        </div>
        <div className="movie-title">
          <span className="label"> </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="year">
          <span className="label"></span>
          <br></br>
          <span className="value">{moment(movie.year).format('YYYY')}</span>
        </div>
        <div className="movie-description">
          <span className="label">
            <br></br>
          </span>
          <span className="value">{movie.summary}</span>
        </div>

        <Link to={`/`}>
          <Button className="back-button">Back</Button>
        </Link>
      </div>
    );
  }
}
