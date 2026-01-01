import * as Yup from 'yup';

export default Yup.object({
  username: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  password: Yup.string()
    .min(5, 'Must be 5 characters or more')
    .max(15, 'Must be 15 characters or less')
    .oneOf([Yup.ref('confirmPassword'), null], 'Passwords must match')
    .required('Required'),
  confirmPassword: Yup.string()
    .min(5, 'Must be 5 characters or more')
    .max(15, 'Must be 15 characters or less')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});
