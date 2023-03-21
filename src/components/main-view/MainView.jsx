import React from 'react';
import axios from 'axios';

import { LoginView } from '../LoginView/login-view';
import { RegistrationView } from '../RegistrationView/registation-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/MovieView';



class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      user: null,
      movies: [],
      selectedMovie: null,
    };
  }

  componentDidMount(){
    let accessToken = localStorage.getItem('token');
      if (accessToken !== null) {
        this.setState({
          user: localStorage.getItem('user')
        });
        this.getMovies(accessToken);
      }
  }

  getMovies(token) {
    axios.get('https://fellini-api.onrender.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({ movies: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

setSelectedMovie(newSelectedMovie) {
      this.setState({
        selectedMovie: newSelectedMovie
      });
    }

    onRegistation(register) {
      this.setState({
        register,
      });
    }

    onLoggedIn(user) {
      this.setState({
        user
      })
    }
   

  render() {
   const { movies, selectedMovie, user, register, } = this.state;

    console.log(movies)

    if(!register)
    return <RegistrationView onRegistation={(register) => this.onRegistration(register)} />
  

   if (!user) {
     return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />

   }

  
   
  
    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

  
  
    return (
      <div className="main-view">
      {selectedMovie
        ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
        : movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
        ))
      }

      <button onClick={() => { setUser(null)}}>Logout</button>
    </div>
    );
  }
}



export default MainView;