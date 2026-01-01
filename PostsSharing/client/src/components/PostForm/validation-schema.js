import * as Yup from 'yup';

export default Yup.object({
  body: Yup.string()
    .max(150, 'Must be 150 characters or less')
    .required('Required'),
});
