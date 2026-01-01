import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    '& .MuiButton-startIcon': {
      margin: 0,
    },
    '& > div > div:nth-child(2)': {
      marginLeft: 10,
    },
  },
}));
