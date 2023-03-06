import React from 'react';
import axios from 'axios';


import { LoginView } from '../LoginView/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/MovieView';


export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [],
      user: null, 
      selectedMovie: null,
    }
  }




  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
    
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.props.setUser({
      user: authData.user.Username
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }
  getMovies(token) {
    axios.get('https://fellini-api.onrender.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        this.props.setMovies(response.data);
        //assign the result to the state
        // this.setState({
        //   movies: response.data,
        // });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  

   setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }



  render() {
    const { movies, selectedMovie, user } = this.state;
   console.log(movies)

 

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