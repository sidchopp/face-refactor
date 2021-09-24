import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import Link from '@material-ui/core/Link';
// import Paper from '@material-ui/core/Paper';
// import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
//import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

import Rank from './Rank';

//CSS
import '../App.css'

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
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


function ImageLinkForm({ onInputChange, onButtonSubmit, onRouteChange, name, entries }) {
  const classes = useStyles();

  return (
    // Add this as an attribute in Grid -->  component={Paper}
    // <Grid item xs={12} sm={8} md={12} elevation={6} square>
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <EmojiEmotionsIcon />
      </Avatar>
      <Typography component="h1" variant="h4">
        Welcome! <span className='welcome'>{name}</span>
      </Typography>
      <Rank name={name} entries={entries} />
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="url"
          label=" Enter the URL of the Image (with a face & press 'Detect')"
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
      <Button
        type="button"
        variant="contained"
        color="secondary"
        className={classes.submit}
        endIcon={<ExitToAppIcon />}
        onClick={() => onRouteChange('signIn')}
      >
        Sign Out
      </Button>
    </div>
    // </Grid>
  )
}

export default ImageLinkForm
