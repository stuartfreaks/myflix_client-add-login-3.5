import React from 'react';
import axios from 'axios';


import { LoginView } from '../LoginView/login-view';
import { SignupView } from '../SignupView/signup-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/MovieView';



class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      user: null
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
    axios.get('https://fellini-api.onrender.com/login', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.props.setMovies(response.data);
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



  render() {
    let { movies } = this.props;
    let { user } = this.state;

  

   if (!user) {
     return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />

   }
   
   if (!register) return (<SignupView onRegistration={(register) => this.onRegistration(register)}/>);
  
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