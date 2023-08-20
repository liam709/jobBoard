import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Footer() {
  return (
<Box
  sx={{
    p: 10,
    backgroundColor: "rgb(0,64,64)",
    marginTop: '2%', 
    minHeight: '15vh'

  }}
>
      <Container maxWidth="md">
        <Grid container sx = {{justifyContent: 'space-between'}}>
          <Grid >
            <Typography variant="h6" color="white" gutterBottom>
              Developed By:
            </Typography>
            <Typography color="white">Liam Kelly, 2023</Typography>
          </Grid>

          <Grid sx = {{}}>
            <Typography variant="h6" color="white" gutterBottom>
              Check out the code!
            </Typography>
            <Link href="https://github.com/liam709" color="rgb(255,255,255)">
              <GitHubIcon/>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}