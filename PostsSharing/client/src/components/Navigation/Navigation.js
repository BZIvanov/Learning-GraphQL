import { NavLink, Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppBar, Toolbar, Button, Box } from '@material-ui/core';
import { useStyles } from './styles';
import { logout } from '../../store/actions/user';

const Navigation = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);

  const handleLogout = () => {
    dispatch(logout());
    history.push('/');
  };

  const renderItems = user ? (
    <>
      <Box className={classes.leftSide}>
        <Button component={Link} to='/' color='secondary'>
          {user.username}
        </Button>
      </Box>
      <Button onClick={handleLogout} color='secondary'>
        Logout
      </Button>
    </>
  ) : (
    <>
      <Box className={classes.leftSide}>
        <Button
          component={NavLink}
          activeClassName={classes.selected}
          exact
          to={'/'}
          color='secondary'
        >
          Home
        </Button>
      </Box>
      <Button
        component={NavLink}
        activeClassName={classes.selected}
        exact
        to={'/register'}
        color='secondary'
      >
        Register
      </Button>
      <Button
        component={NavLink}
        activeClassName={classes.selected}
        exact
        to={'/login'}
        color='secondary'
      >
        Login
      </Button>{' '}
    </>
  );
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>{renderItems}</Toolbar>
      </AppBar>
    </div>
  );
};

export default Navigation;
