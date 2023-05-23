import React from 'react';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  Redirect,
} from 'react-router-dom';
import Row from 'react-bootstrap/Row';

import Col from 'react-bootstrap/Col';

import { LoginView } from '../LoginView/login-view';
import { RegistrationView } from '../RegistrationView/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/MovieView';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { NavigationBarOut } from '../navigation-bar/navigation-bar-out';

import ProfileView from '../profile-view/profile-view';

import './main-view.scss';
import { BrowserRouter } from 'react-router-dom';

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      movies: [],
      selectedMovie: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios
      .get('https://fellini-api.onrender.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.username,
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token);
    window.open('/', '_self');
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // this.setState({
    //   user: null,
    // });
    window.open('/', '_self');
  }

  handleFavorite = (movieId, action) => {
    const { user, favoriteMovies } = this.state;
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null && user !== null) {
      // Add MovieID to Favorites
      if (action === 'add') {
        this.setState({ favoriteMovies: [...favoriteMovies, movieId] });
        axios
          .post(
            `https://fellini-api.onrender.com/users/${user}/movies/${movieId}`,
            {},
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          .then((res) => {
            console.log(`Movie added to ${user} favorite movies`);
          })
          .catch((err) => {
            console.log(err);
          });

        // Remove MovieID from Favorites
      } else if (action === 'remove') {
        this.setState({
          favoriteMovies: favoriteMovies.filter((id) => id !== movieId),
        });
        axios
          .delete(
            `https://fellini-api.onrender.com/users/${user}/movies/${movieId}`,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          .then((res) => {
            console.log(`Movie removed from ${user} favorite movies`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  render() {
    const { movies, user, favoriteMovieList, token, favoriteMovie } =
      this.state;

    if (!user) {
      return (
        <BrowserRouter>
          <Router>
            <NavigationBarOut />
            <Row className="main-view justify-content-md-center">
              <Route
                exact
                path="/login"
                render={() => {
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                }}
              />
              <Route
                exact
                path="/register"
                render={() => {
                  return (
                    <Col>
                      <RegistrationView />
                    </Col>
                  );
                }}
              />
            </Row>
          </Router>
        </BrowserRouter>
      );
    }

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <BrowserRouter>
        <Router>
          <NavigationBar
            user={user}
            onLoggedOut={this.onLoggedOut}
            onSearch={(query) => {
              setViewMovies(
                movies.filter((movie) =>
                  movie.title.toLowerCase().includes(query.toLowerCase())
                )
              );
            }}
          />

          <Row className="main-view justify-content-md-center">
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return movies.map((m) => (
                  <Col xs={2} md={3} key={m._id}>
                    <MovieCard movie={m} />
                  </Col>
                ));
              }}
            />

            <Route
              path="/users/:user"
              render={(history) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                      ;
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <ProfileView
                      movies={movies}
                      user={user}
                      favoriteMovieList={favoriteMovieList}
                      token={token}
                      favoriteMovies={favoriteMovie}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/movies/:movieId"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                      ;
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <MovieView
                      movie={movies.find((m) => m._id === match.params.movieId)}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/directors/:name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                      ;
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <DirectorView
                      director={
                        movies.find(
                          (m) => m.Director.Name === match.params.name
                        ).Director
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/genres/:name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                      ;
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <GenreView
                      genre={
                        movies.find((m) => m.Genre.Name === match.params.name)
                          .Genre
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
          </Row>
        </Router>
      </BrowserRouter>
    );
  }
}

export default MainView;
