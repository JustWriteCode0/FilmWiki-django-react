import { React, useContext } from 'react'
import { Grid, Box, Container } from '@mui/material'
import "../styles/Films.css"


const Films = () => {
    return(
        <Container maxWidth="lg" >
        <Grid container spacing={5} className="films-container">
            <Grid item>
              <Box className="box-test" xs={2} sx={{ background: '#fff', position: 'relative', }}>
              </Box>
            </Grid>
            <Grid item>
              <Box className="box-test" xs={2} sx={{ background: '#fff', position: 'relative', }}>
              </Box>
            </Grid>
            <Grid item>
              <Box className="box-test" xs={2} sx={{ background: '#fff', position: 'relative', }}>
              </Box>
            </Grid>
            <Grid item>
              <Box className="box-test" xs={2} sx={{ background: '#fff', position: 'relative', }}>
              </Box>
            </Grid>
            <Grid item>
              <Box className="box-test" xs={2} sx={{ background: '#fff', position: 'relative', }}>
              </Box>
            </Grid>
            <Grid item>
              <Box className="box-test" xs={2} sx={{ background: '#fff', position: 'relative', }}>
              </Box>
            </Grid>
        </Grid>          
        </Container>
    )
}

export default Films