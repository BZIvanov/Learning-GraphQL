import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  ButtonGroup,
  Button,
  Typography,
  Box,
  Tooltip,
} from '@material-ui/core';
import { Favorite, Loyalty, QuestionAnswer } from '@material-ui/icons';
import { DeleteButton } from '../DeleteButton';
import { LIKE_POST_MUTATION } from '../../gql';
import { useStyles } from './styles';

const PostCard = ({
  post: { id, username, body, createdAt, likes, likeCount, commentCount },
}) => {
  const classes = useStyles();
  const user = useSelector((state) => state.users.user);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likeButton = user ? (
    <Button
      size='small'
      color='secondary'
      startIcon={liked ? <Loyalty /> : <Favorite />}
      onClick={likePost}
    />
  ) : (
    <Button
      component={Link}
      to={'/login'}
      size='small'
      color='secondary'
      startIcon={<Favorite />}
    />
  );

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link to={`/post/${id}`}>
          <CardMedia
            className={classes.media}
            image='https://gameranx.com/wp-content/uploads/2019/08/Animal-Crossing-New-Horizons-1080P-Wallpaper-2-1024x576.jpg'
            title='Contemplative Reptile'
          />
        </Link>
      </CardActionArea>
      <CardContent>
        <Typography gutterBottom variant='h5' component='h2'>
          {username}
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          {body}
        </Typography>
        <Typography variant='caption' color='textSecondary' component='p'>
          {moment(createdAt).fromNow()}
        </Typography>
      </CardContent>

      <CardActions className={classes.actions}>
        <Box>
          <ButtonGroup disableElevation variant='contained'>
            <Tooltip title={liked ? 'Unlike' : 'Like'} arrow leaveDelay={100}>
              {likeButton}
            </Tooltip>
            <Tooltip title='Like count' arrow leaveDelay={100}>
              <Button size='small' color='secondary'>
                {likeCount}
              </Button>
            </Tooltip>
          </ButtonGroup>
          <ButtonGroup disableElevation variant='contained'>
            <Tooltip
              title={user ? 'Comment' : 'Login to comment'}
              arrow
              leaveDelay={100}
            >
              <Button
                component={Link}
                to={`/post/${id}`}
                size='small'
                color='primary'
                startIcon={<QuestionAnswer />}
              />
            </Tooltip>
            <Tooltip title='Comment count' arrow leaveDelay={100}>
              <Button size='small' color='primary'>
                {commentCount}
              </Button>
            </Tooltip>
          </ButtonGroup>
        </Box>
        {username === (user && user.username) && <DeleteButton postId={id} />}
      </CardActions>
    </Card>
  );
};

export default PostCard;
