import { BrowserRouter, Route } from 'react-router-dom';
import { CssBaseline, Container } from '@material-ui/core';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Post } from './pages/Post';
import { Navigation } from './components/Navigation';
import { AuthRoute } from './components/AuthRoute';

const App = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth='lg' disableGutters>
        <BrowserRouter>
          <Navigation />
          <Route exact path='/' component={Home} />
          <AuthRoute exact path='/register' component={Register} />
          <AuthRoute exact path='/login' component={Login} />
          <Route exact path='/post/:postId' component={Post} />
        </BrowserRouter>
      </Container>
    </>
  );
};

export default App;
