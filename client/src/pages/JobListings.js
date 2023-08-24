import { useState, useEffect } from "react"
import axios from 'axios';
import { Card, ThemeProvider, Typography, createTheme, Backdrop, Container, ButtonGroup, Button, TextField, Modal, Box, Paper, Link } from "@mui/material";
import '../App.css';
import SearchIcon from '@mui/icons-material/Search';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import BookmarkIcon from '@mui/icons-material/Bookmark';




export default function JobListings() {

    const [jobs, setJobs] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [publicJobs, setPublicJobs] = useState([]);
    const userID = window.localStorage.getItem("userID")
    const [searchText, setSearchText] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState([])

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost:3001/listings');
                setJobs(response.data.job)
                console.log('response data job', response.data.job)
            } catch (err) {
                console.error(err)
            }
        };
        fetchJobs();
    }, []);
    //console.log(publicJobs)

    //Save job listing to user collection
    const handleSaveSubmit = async (event, index) => {
        event.preventDefault();
        let savedJobs;
        try {
            //Getting index from map function.
            const selectedJob = publicJobs[index]
            await axios.patch(`http://localhost:3001/user/update/${userID}`, {
                savedJobs: selectedJob
            });
            console.log('savedJobs', savedJobs)

            //console.log('data', data)
        } catch (error) {
            console.error(error);
        }
    };

    const fetchPublicJobs = async () => {
        const options = {
            method: 'GET',
            url: 'https://jsearch.p.rapidapi.com/search',
            params: {
                query: `${searchText}`,
                page: `${pageNumber}`,
                num_pages: 1
            },
            headers: {
                //Add your own API
                'X-RapidAPI-Key': '9c03912f2fmsh0ebf495bcf916a0p13a6e8jsnd21bd2905d10',
                'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
            }
        };
        try {
            const response = await axios.request(options);
            setPublicJobs(response.data.data)
            console.log(response.data)

        } catch (err) {
            console.error(err);
        }
    }

    const handleOpen = async (event, index) => {
        event.preventDefault();
        const selectedJob = publicJobs[index];
        setSelectedJob(selectedJob)
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

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
    console.log(searchText)

    return (
        <>
            <ThemeProvider theme={theme}>
                <Container
                    maxWidth='lg'
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignContent: "center",
                        minHeight: '100vh'
                    }}>
                    <Box sx={{ marginTop: '3.5%' }}>
                        <Typography sx={{ fontSize: 24, color: 'white', marginTop: '2.5%' }}>Find your dream job today.</Typography>
                        <TextField sx={{ marginTop: '3%', backgroundColor: 'third.main', width: '100%', marginBottom: '3%' }}
                            label="Search: (Job Title, City, Province, Country)"
                            variant="filled"
                            focused
                            color='primary'
                            onChange={(event) => setSearchText(event.target.value)}
                            InputProps={{
                                endAdornment: <Button
                                    sx={{ width: '0.5%', ':hover': { bgcolor: 'secondary.main' } }}
                                    onClick={() => fetchPublicJobs()}
                                    variant="contained"
                                    startIcon=
                                    {<SearchIcon sx={{ width: '165%' }} />}>
                                </Button>
                            }}
                        />
                    </Box>

                    <ul>
                        {/*Save index to know which job is being stored on save click.. Pass index into saveSubmit so it knows which card to save. */}
                        {publicJobs.map((job, index) => (
                            <li key={job.job_id} >
                                <Card sx={{ marginTop: '2%', width: '100%', backgroundColor: 'third.main', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
                                </Card>

                                <ButtonGroup sx={{ display: 'flex', backgroundColor: 'primary.main', justifyContent: 'center', width: '100%' }} variant="contained" >
                                    <Button onClick={(event) => handleOpen(event, index)} sx={{ width: '100%', display: 'flex', backgroundColor: 'primary.main', fontSize: '14px', justifyContent: 'center', ':hover': { bgcolor: 'secondary.main' } }}>More info</Button>
                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        slots={{ backdrop: Backdrop }}
                                        slotProps={{
                                            backdrop: {
                                                sx: {
                                                    backgroundColor: 'rgba(0, 72, 72, 0.1)',
                                                    overflow: 'auto',
                                                },
                                            },
                                        }}
                                    >
                                        <Box sx={{
                                            position: 'absolute', top: '50%', left: '50%', width: '60%', height: '80%', bgcolor: "third.main",
                                            transform: "translate(-50%, -50%)", overflow: 'auto', p: 4, scrollbarColor: '#008080 #66b2b2'
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
                                    {userID ? (
                                        <Button sx={{ width: '25%', color: 'white', fontSize: '14px', ':hover': { bgcolor: 'secondary.main' } }} onClick={(event) => handleSaveSubmit(event, index)}>Save<BookmarkIcon /> </Button>
                                    ) : (<></>)}

                                </ButtonGroup>
                            </li>
                        ))}
                    </ul>
                    {/* To do */}

                </Container>

            </ThemeProvider>
        </>
    )
}