import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { Grid, Box } from '@material-ui/core';
import { PostCard } from '../../components/PostCard';
import { CommentCard } from '../../components/CommentCard';
import { PostForm } from '../../components/PostForm';
import { FETCH_POST_QUERY } from '../../gql';
import { useStyles } from './styles';

const Post = (props) => {
  const classes = useStyles();
  const user = useSelector((state) => state.users.user);
  const postId = props.match.params.postId;

  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  return (
    <>
      {data && (
        <Grid
          container
          justifyContent='center'
          spacing={3}
          className={classes.list}
        >
          <Grid item lg={3} md={4} sm={6}>
            <PostCard post={data.getPost} />
          </Grid>
        </Grid>
      )}
      {user && (
        <Box className={classes.form}>
          <PostForm id={postId} />
        </Box>
      )}
      <Grid
        container
        justifyContent='center'
        spacing={3}
        className={classes.list}
      >
        {data &&
          data.getPost.comments.map((comment) => (
            <Grid key={comment.id} item lg={8} md={8} sm={8}>
              <CommentCard comment={comment} postId={postId} />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default Post;
