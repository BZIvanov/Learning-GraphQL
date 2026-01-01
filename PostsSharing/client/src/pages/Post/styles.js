import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  list: {
    padding: theme.spacing(3),
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));
