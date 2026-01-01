import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(3),
    '& > h5': {
      marginBottom: theme.spacing(2),
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 300,
    '& > *': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    '& > button': {
      marginTop: theme.spacing(5),
    },
  },
}));
