import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import './movie-view.scss';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick, handleFavorite } = this.props;

    return (
      <div className="movie-view">
        <Button onClick={this.handleFavorite}>FAVORITE</Button>

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
