import { useMutation } from '@apollo/client';
import { Formik } from 'formik';
import { TextField, Button } from '@material-ui/core';
import * as _ from 'lodash';
import {
  FETCH_POSTS_QUERY,
  CREATE_POST_MUTATION,
  CREATE_COMMENT_MUTATION,
} from '../../gql';
import validationSchema from './validation-schema';

const PostForm = ({ id }) => {
  const [createPost] = useMutation(
    id ? CREATE_COMMENT_MUTATION : CREATE_POST_MUTATION,
    {
      update(proxy, { data: createPost }) {
        if (!id) {
          const data = _.cloneDeep(
            proxy.readQuery({
              query: FETCH_POSTS_QUERY,
            })
          );
          data.getPosts.push(createPost);
          proxy.writeQuery({
            query: FETCH_POSTS_QUERY,
            data,
          });
        }
      },
      onError(err) {
        console.log(err);
      },
    }
  );

  const handleSubmit = (values, { resetForm }) => {
    const submitValues = { ...values };
    if (id) {
      submitValues['postId'] = id;
    }

    createPost({ variables: submitValues });
    resetForm();
  };

  return (
    <Formik
      initialValues={{ body: '' }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <TextField
            label='Body'
            size='small'
            name='body'
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.body}
            error={!!props.errors.body && props.touched.body}
            helperText={props.touched.body && props.errors.body}
          />
          <Button type='submit' variant='contained' color='primary'>
            Submit
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default PostForm;
