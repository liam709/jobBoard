import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import { Button } from '@mui/material'
import { Container, Card} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';

export default function Form({ username, setUsername, password, setPassword, label, onSubmit }) {

    const theme = createTheme({
        palette: {
            primary: {
                // Purple and green play nicely together.
                main: '#004c4c',
            },
            secondary: {
                // This is green.A700 as hex.
                main: '#008080',
            },
            third: {
                main: '#66b2b2'
            }
        },
    });

    return (
        <ThemeProvider theme={theme}>
                <Container 
                    component="form"
                    onSubmit={onSubmit}
                    sx={{
                        backgroundColor: 'secondary.main',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: '2.5%',
                        height: '100vh'
                    }}>
                    <Card raised = 'true' sx = {{
                        backgroundColor: 'third.main',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '90%',
                        width: '70%', 
                    }}> 
                    <Typography sx={{ marginBottom: '12.5%', color: 'white' }} variant='h3' >{label}</Typography>
                    <TextField sx={{width: '30%' }} id="username" label="Username" variant="standard" value={username} onChange={(event) => setUsername(event.target.value)} />
                    <TextField sx={{ marginBottom: '7.5%', marginTop: 5, width: '30%' }} id="password" type='password' label="Password" variant="standard" value={password} onChange={(event) => setPassword(event.target.value)} />
                    <Button sx={{ width: '20%', marginBottom: '3%', }} variant='contained' color='primary' type='submit'>Submit</Button>
                    {label == 'Register' ? (
                        <>
                        <Typography sx = {{marginTop : '7.5%', color: 'white'}}>Already have an account?</Typography>
                        <Button sx = {{marginTop: '3%'}} component={Link} to = {'/login'}>Login</Button>
                        </>
                        
                    ) : (
                        <>
                        <Typography sx = {{marginTop : '7.5%', color: 'white'}}>Don't have an account?</Typography>
                        <Button sx = {{marginTop: '3%'}} component={Link} to = {'/register'}>Register</Button>
                        </>
                    )}

                    </Card>
                    
                    </Container>
                   

        </ThemeProvider>
    )
}