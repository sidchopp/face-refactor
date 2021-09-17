import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


function ImageLinkForm({ onInputChange, onButtonSubmit }) {
  const classes = useStyles();

  return (
    // Add this as an attribute in Grid -->  component={Paper}
    // <Grid item xs={12} sm={8} md={12} elevation={6} square>
    <div className={classes.paper}>

      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="url"
          label=" Enter the URL"
          name="url"
          autoFocus
          onChange={onInputChange}
        />

        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          startIcon={<SearchIcon />}
          onClick={onButtonSubmit}
        >
          Detect
        </Button>
        <Grid container>
        </Grid>

      </form>
    </div>
    // </Grid>
  )
}

export default ImageLinkForm
