import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { TextField, Button, Typography } from '@material-ui/core';
import { Loading } from '../../components/Loading';
import { login } from '../../store/actions/user';
import { REGISTER_USER } from '../../gql';
import validationSchema from './validation-schema';
import { useStyles } from './styles';

const Register = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data }) {
      dispatch(login(data.register.token));
      history.push('/');
    },
    onError(err) {
      console.log(err);
    },
  });

  const initialValues = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = (values) => {
    registerUser({ variables: values });
  };

  return (
    <div className={classes.wrapper}>
      <Typography variant='h5'>Register form</Typography>
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
              error={
                !!props.errors.password &&
                props.touched.password &&
                props.touched.confirmPassword
              }
              helperText={
                props.touched.password &&
                props.touched.confirmPassword &&
                props.errors.password
              }
            />
            <TextField
              label='Confirm Password'
              size='small'
              name='confirmPassword'
              type='password'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.confirmPassword}
              error={
                !!props.errors.confirmPassword &&
                props.touched.password &&
                props.touched.confirmPassword
              }
              helperText={
                props.touched.password &&
                props.touched.confirmPassword &&
                props.errors.confirmPassword
              }
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

export default Register;
