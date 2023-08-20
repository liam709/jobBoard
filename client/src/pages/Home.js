import { Typography, Container, Card } from "@mui/material"

export default function Home() {
    return (
        <Container sx={{ display: 'flex', alignContent: 'center', minHeight: '60vh', minWidth: '70vw', justifyContent: 'center', flexDirection: 'column' }}
        >
            <Typography sx={{ fontSize: 32, color: 'white', marginTop: '2%' }}>Job Board Application</Typography>
            <Card raised='true' sx={{ marginTop: '3%', backgroundColor: '#66b2b2', display: 'flex', justifyContent: 'center', flexDirection: 'column', height: '50%', marginBottom: '2%' }}>
                <Typography sx={{ fontSize: 28, color: '#004c4c', display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: '0%', p: 3 }}>I created this application to enhance my job search experience, driven by the need for efficiency. Constructed using the JBoard API from RapidAPI, this tool scans through numerous renowned job boards such as LinkedIn, Glassdoor, Indeed, and others. By centralizing all job postings in one location, it simplifies the job hunting process, eliminating the need to navigate multiple websites. This app aims to streamline the job search process, eliminating the hassle of scouring various platforms for opportunities. </Typography>
                <Typography sx={{ fontSize: 28, color: '#004c4c', display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: '0%', p: 3 }}> Users can create an account, and then login to bookmark job listings. This keeps job postings of interest in a secure place, and allows users to come back and reference bookmarked job postings at a later time. </Typography>
            </Card>
        </Container>
    )
}

