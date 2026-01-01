import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  leftSide: {
    flexGrow: 1,
  },
  selected: {
    boxShadow: `0px 0px 10px ${theme.palette.secondary.main}`,
  },
}));
