import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import '../App.css';
import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';

export default function NavBar() {

  const [cookies, setCookies] = useCookies(["access_token"])
  const navigate = useNavigate();

  const logout = () => {
    //Clear cookies
    setCookies("access_token", "");
    //Remove logged in userID from local storage
    window.localStorage.removeItem("userID");
    //Navigate back to home page.
    navigate('/login')
  }

  //Create custom color pallette
  const theme = createTheme({
    palette: {
      primary: {
        main: '#004c4c',
      },
      secondary: {
        main: '#008080',
      },
      third: {
        main: '#66b2b2'
      }
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Toolbar sx={{ backgroundColor: 'third.main', margin: 0, padding: 0, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '10vh' }}>
          {!cookies.access_token ? (
            <>
              <Button sx={{ backgroundColor: 'primary.main', color: 'white', marginLeft: '2%', width: '50%', height: "60%", fontSize: '18px', ':hover': {bgcolor: 'secondary.main'}}} component={Link} to={"/"}>About</Button>
              <Button sx={{ backgroundColor: 'primary.main', color: 'white', marginLeft: '2%', width: '50%', height: "60%", fontSize: '18px', ':hover': {bgcolor: 'secondary.main'}}} component={Link} to={"/listings"}>Find jobs</Button>
              <Button sx={{ backgroundColor: 'primary.main', color: 'white', marginLeft: '2%', width: '50%', height: "60%", fontSize: '18px', ':hover': {bgcolor: 'secondary.main'}}} component={Link} to={'/login'}>Login</Button>
              <Button sx={{ backgroundColor: 'primary.main', color: 'white', marginLeft: '2%', width: '50%', height: "60%", fontSize: '18px',':hover': {bgcolor: 'secondary.main'}}} component={Link} to={'/register'}>Register</Button>
            </>
          ) : (
            <>
              {/* Available links if logged in*/}
              <Button sx={{ backgroundColor: 'primary.main', color: 'white', marginLeft: '2%', width: '50%', height: "60%", fontSize: '18px', ':hover': {bgcolor: 'secondary.main'}}} component={Link} to={"/"}>About</Button>
              <Button sx={{ backgroundColor: 'primary.main', color: 'white', marginLeft: '2%', width: '50%', height: "60%",fontSize: '18px', ':hover': {bgcolor: 'secondary.main'}}} component={Link} to={"/listings"}>Find jobs</Button>
              <Button sx={{ backgroundColor: 'primary.main', color: 'white', marginLeft: '2%', width: '50%', height: "60%", fontSize: '18px', ':hover': {bgcolor: 'secondary.main'}}} component={Link} to={'/savedjobs'}>Saved Jobs</Button>
              <Button sx={{ backgroundColor: 'primary.main', color: 'white', marginLeft: '2%', width: '50%', height: "60%", fontSize: '18px',':hover': {bgcolor: 'secondary.main'}}} onClick={logout}> Logout </Button>
            </>
          )}
        </Toolbar>
      </ThemeProvider>

    </>
  )
}