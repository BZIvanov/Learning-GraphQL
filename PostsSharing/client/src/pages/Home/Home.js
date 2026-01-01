import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { Grid, Typography, Box } from '@material-ui/core';
import { FETCH_POSTS_QUERY } from '../../gql';
import { PostCard } from '../../components/PostCard';
import { PostForm } from '../../components/PostForm';
import { Loading } from '../../components/Loading';
import { useStyles } from './styles';

const Home = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.users.user);

  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <>
      <Typography variant='h4' className={classes.title}>
        Posts
      </Typography>

      {user && (
        <Box className={classes.form}>
          <PostForm />
        </Box>
      )}
      <Grid
        container
        justifyContent='center'
        spacing={3}
        className={classes.list}
      >
        {loading ? (
          <Loading />
        ) : data ? (
          data.getPosts.map((post) => (
            <Grid key={post.id} item lg={3} md={4} sm={6}>
              <PostCard post={post} />
            </Grid>
          ))
        ) : null}
      </Grid>
    </>
  );
};

export default Home;
