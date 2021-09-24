import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Link from '@material-ui/core/Link';

//CSS
import '../App.css'

function Footer() {
  return (
    <Typography component={'span'} variant="body2" color="textSecondary" align="center">
      <div>
        <Link color="primary" href="https://github.com/sidchopp" target="_blank">
          <GitHubIcon />
        </Link>{' '}
        <Link color="primary" href="https://www.linkedin.com/in/sidchopp/" target="_blank">
          <LinkedInIcon />
        </Link>
      </div>
      <div>
        {'Sid © '}
        {new Date().getFullYear()}
        {'.'}</div>
    </Typography>
  );
}

export default Footer;