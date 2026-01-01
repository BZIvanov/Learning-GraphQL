import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Button, Modal, Typography, Box } from '@material-ui/core';
import * as _ from 'lodash';
import { Delete } from '@material-ui/icons';
import {
  FETCH_POSTS_QUERY,
  FETCH_POST_QUERY,
  DELETE_POST_MUTATION,
  DELETE_COMMENT_MUTATION,
} from '../../gql';
import { useStyles } from './styles';

const DeleteButton = ({ postId, commentId }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const [deletePostOrMutation] = useMutation(
    postId && commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION,
    {
      update(cache) {
        setOpen(false);
        if (!commentId) {
          const data = _.cloneDeep(
            cache.readQuery({
              query: FETCH_POSTS_QUERY,
            })
          );
          data.getPosts = data.getPosts.filter((p) => p.id !== postId);
          // evict will ignore the warning for manually changing the cache
          cache.evict({
            fieldName: 'getPosts',
            broadcast: false,
          });
          cache.writeQuery({ query: FETCH_POSTS_QUERY, data });
          history.push('/');
        } else {
          const data = _.cloneDeep(
            cache.readQuery({
              query: FETCH_POST_QUERY,
              variables: {
                postId,
              },
            })
          );
          data.getPost.comments = data.getPost.comments.filter(
            (c) => c.id !== commentId
          );
          cache.writeQuery({ query: FETCH_POST_QUERY, data });
        }
      },
      variables: {
        postId,
        commentId,
      },
    }
  );

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant='contained'
        color='secondary'
        size='small'
        startIcon={<Delete />}
      />

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className={classes.modal}>
          <Typography variant='h5'>Delete?</Typography>
          <Button variant='contained' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant='contained' onClick={deletePostOrMutation}>
            Delete
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteButton;
