import { useSelector } from 'react-redux';
import { Card, CardActions, CardContent, Typography } from '@material-ui/core';
import moment from 'moment';
import { DeleteButton } from '../DeleteButton';
import { useStyles } from './styles';

const CommentCard = ({ comment, postId }) => {
  const classes = useStyles();
  const user = useSelector((state) => state.users.user);

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant='h5' component='h2'>
          {comment.username}
        </Typography>
        <Typography className={classes.pos} color='textSecondary'>
          {moment(comment.createdAt).fromNow()}
        </Typography>
        <Typography variant='body2' component='p'>
          {comment.body}
        </Typography>
      </CardContent>
      {user && user.username === comment.username && (
        <CardActions>
          <DeleteButton postId={postId} commentId={comment.id} />
        </CardActions>
      )}
    </Card>
  );
};

export default CommentCard;
