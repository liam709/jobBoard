import { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Card, ThemeProvider, createTheme, Container, Button, ButtonGroup, Modal, Box, Backdrop, Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';



export default function SavedJobs() {

    const [savedJobs, setSavedJobs] = useState([])
    const [forceRender, setForceRender] = useState(0)
    const [open, setOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState([])

    //Get logged in user ID from local storage.
    const userID = window.localStorage.getItem("userID");

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

    useEffect(() => {
        const fetchSavedJobs = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/user/${userID}`);
                console.log('saved', response.data.savedJobs)
                setSavedJobs(response.data.savedJobs)
            } catch (err) {
                console.log('error')
            }
        }
        fetchSavedJobs();
    }, [forceRender])

    const handleDelete = async (event, index) => {
        event.preventDefault();
        try {
            const selectedJob = savedJobs[index];
            const selectedId = selectedJob.job_id;
            const response = await axios.patch(`http://localhost:3001/user/savedjobs/${userID}`, {
                job_id: selectedId,
            }).then(() => setForceRender(prev => prev + 1));
            console.log('rep', response)
        } catch (err) {
            console.log(err)
        }
    }

    const handleOpen = async (event, index) => {
        event.preventDefault();
        const selectedJob = savedJobs[index];
        setSelectedJob(selectedJob)
        setOpen(true);
    }
    const handleClose = () => setOpen(false);


    return (
        <>
            <ThemeProvider theme={theme}>
                <Container
                    maxWidth='lg'
                    sx={{
                        marginBottom: '2%',
                        width: '85%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignContent: "center",
                        minHeight: '100vh'
                    }}>
                    {savedJobs != undefined && savedJobs.length > 0 ? (
                        <ul>
                            <>
                                <Typography variant="h6" sx={{ display: 'flex', justifyContent: 'center', marginTop: '2%', color: 'white' }}>Saved job postings: </Typography>
                            </>
                            {savedJobs.map((job, index) => (
                                <li key={job.job_id}>
                                    <Card sx={{ marginTop: '3%', width: '100%', backgroundColor: 'third.main', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <Paper variant='outlined' sx={{ backgroundColor: 'third.main', borderColor: 'third.main', display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography sx={{ display: 'flex', justifyContent: 'left', fontSize: '150%' }}>Employer: {job.employer_name} </Typography>
                                            <img src={job.employer_logo}
                                                alt="n/a"
                                                height="32px"
                                                width='32px'
                                            />
                                        </Paper>
                                        <Typography sx={{ fontSize: '150%' }}>Job Title: {job.job_title}</Typography>
                                        <Typography sx={{ fontSize: '150%' }}>City: {job.job_city}</Typography>
                                        <Typography sx={{ fontSize: '150%' }}>Province: {job.job_state}</Typography>
                                        <Typography sx={{ fontSize: '150%' }}>Country: {job.job_country}</Typography>
                                        <Typography sx={{ fontSize: '150%' }}>Date posted: {job.job_posted_at_datetime_utc}</Typography>
                                        <ButtonGroup sx={{ display: 'flex', backgroundColor: 'primary.main', justifyContent: 'center', width: '100%' }} variant="contained" >
                                            <Button onClick={(event) => handleOpen(event, index)} sx={{ width: '100%', display: 'flex', backgroundColor: 'primary.main', fontSize: '14px', justifyContent: 'center', ':hover': { bgcolor: 'secondary.main' } }}>More Information</Button>
                                            <Modal
                                                open={open}
                                                onClose={handleClose}
                                                slots={{ backdrop: Backdrop }}
                                                slotProps={{
                                                    backdrop: {
                                                        sx: {
                                                            backgroundColor: 'rgba(0, 72, 72, 0.3)',
                                                            overflow: 'auto',
                                                        },
                                                    },
                                                }}
                                            >
                                                <Box sx={{
                                                    position: 'absolute', top: '50%', left: '50%', width: '60%', height: '80%', bgcolor: "third.main",
                                                    transform: "translate(-50%, -50%)", p: 4, overflow: 'auto', scrollbarColor: '#008080 #66b2b2'
                                                }}>
                                                    <Typography id="modal-modal-title" variant="h6" component="h2" color="primary">
                                                        <b>Employer name: </b>{selectedJob.employer_name}
                                                    </Typography>
                                                    <Typography id="modal-modal-description" color="primary" variant="h6" sx={{ mt: 2 }}>
                                                        <b>Job Title: </b> {selectedJob.job_title}
                                                    </Typography>
                                                    <Typography id="modal-modal-description" color="primary" variant="h6" sx={{ mt: 2 }}>
                                                        <b>Job Description: </b>{selectedJob.job_description}
                                                    </Typography>
                                                    <Typography id="modal-modal-description" color="primary" variant="h6" sx={{ mt: 2 }}>
                                                        <b>Job City: </b>{selectedJob.job_city}
                                                    </Typography>
                                                    <Typography id="modal-modal-description" color="primary" variant="h6" sx={{ mt: 2 }}>
                                                        <b>Job Province: </b>{selectedJob.job_state}
                                                    </Typography>
                                                    <Typography id="modal-modal-description" color="primary" variant="h6" sx={{ mt: 2 }}>
                                                        <b>Job Country: </b>{selectedJob.job_country}
                                                    </Typography>
                                                    <Typography id="modal-modal-description" color="primary" variant="h6" sx={{ mt: 2 }}>
                                                        <b>Job Publisher: </b> {job.job_publisher}
                                                    </Typography>
                                                    <Typography id="modal-modal-description" color="primary" variant="h6" sx={{ mt: 2 }}>
                                                        <b>Job Posting: </b><Button href={job.job_apply_link}>Job Post Link</Button></Typography>
                                                    <Button sx={{ position: "fixed", top: 0, right: 0, zIndex: 2000 }} onClick={handleClose}>X</Button>
                                                </Box>
                                            </Modal>
                                            <Button sx={{ width: '25%', fontSize: '14px', ':hover': { bgcolor: 'secondary.main' } }} onClick={(event) => handleDelete(event, index)} aria-label="delete" size="large" >
                                                Delete
                                                <DeleteForeverIcon />
                                            </Button>
                                        </ButtonGroup>
                                    </Card>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <Typography variant='h5' sx={{ display: 'flex', justifyContent: 'center', marginTop: '2%', color: 'white' }}>No Saved jobs!</Typography>
                    )}
                </Container>
            </ThemeProvider>
        </>
    )
}