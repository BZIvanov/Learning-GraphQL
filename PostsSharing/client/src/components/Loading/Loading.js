import { CircularProgress } from '@material-ui/core';
import { useStyles } from './styles';

const Loading = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress color='secondary' />
    </div>
  );
};

export default Loading;
