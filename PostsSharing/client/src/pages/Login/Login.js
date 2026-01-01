import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { TextField, Button, Typography } from '@material-ui/core';
import { Loading } from '../../components/Loading';
import { Notification } from '../../components/Notification';
import { LOGIN_USER } from '../../gql';
import validationSchema from './validation-schema';
import { useStyles } from './styles';

import { login } from '../../store/actions/user';

const Login = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data }) {
      dispatch(login(data.login.token));
      setErrorMessage('');
      history.push('/');
    },
    onError(err) {
      setErrorMessage(err.graphQLErrors[0].message);
      console.log(err);
    },
  });

  const initialValues = {
    username: '',
    password: '',
  };

  const handleSubmit = (values) => {
    setErrorMessage('');
    loginUser({ variables: values });
  };

  return (
    <div className={classes.wrapper}>
      <Notification message={errorMessage} />
      <Typography variant='h5'>Login form</Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit} className={classes.form}>
            <TextField
              label='Username'
              size='small'
              name='username'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.username}
              error={!!props.errors.username && props.touched.username}
              helperText={props.touched.username && props.errors.username}
            />
            <TextField
              label='Password'
              size='small'
              name='password'
              type='password'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.password}
              error={!!props.errors.password && props.touched.password}
              helperText={props.touched.password && props.errors.password}
            />
            <Button
              type='submit'
              variant='contained'
              color='primary'
              disabled={loading}
            >
              {loading ? <Loading /> : 'Submit'}
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
