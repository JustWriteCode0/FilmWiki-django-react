import { React, useContext } from 'react'
import { Grid, Box, Container } from '@mui/material'
import "../styles/Films.css"


const Films = () => {
    return(
        <Grid container justify="center" spacing={5}  className="films-container">
            <Grid item>
              <Box className="box-test" sx={{ background: '#fff', }}>
              </Box>
            </Grid>
            <Grid item>
              <Box className="box-test" sx={{ background: '#fff', }}>
              </Box>
            </Grid>
            <Grid item>
              <Box className="box-test" sx={{ background: '#fff', }}>
              </Box>
            </Grid>
            <Grid item>
              <Box className="box-test" sx={{ background: '#fff', }}>
              </Box>
            </Grid>
            <Grid item>
              <Box className="box-test" sx={{ background: '#fff', }}>
              </Box>
            </Grid>
            <Grid item>
              <Box className="box-test" sx={{ background: '#fff', }}>
              </Box>
            </Grid>
        </Grid>
    )
}

export default Films