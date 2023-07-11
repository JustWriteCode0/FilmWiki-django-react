import React from "react";
import { Grid } from "@mui/material";


const GridTest = () => {
    return(
        <Grid container sx={{ marginTop: 2, }}>
            <Grid item container xs={10}>
                <Grid item container xs={4} sx={{ height: "900px", }}>
                    <Grid item xs={12} sx={{ background: "#76FFDE", margin: '10px', }}>
                        half of filrs
                    </Grid>
                    <Grid item xs={12} sx={{ background: "#76FFDE", margin: '10px', }}>
                        half of filrs
                    </Grid>
                </Grid>

                <Grid item container xs={8} sx={{ height: "900px", }}>
                    <Grid item xs={12} sx={{ background: "#76FFDE", margin: '10px', }}>
                        first
                    </Grid>
                    <Grid item xs={12} sx={{ background: "#76FFDE", margin: '10px', }}>
                        second
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={2} sx={{ background: "#76FFDE",  }}>
                <h1 style={{ marginBottom: '200px', }}>GRID 2</h1>
                <h1 style={{ marginBottom: '200px', }}>GRID 2</h1>
                <h1 style={{ marginBottom: '200px', }}>GRID 2</h1>
                <h1 style={{ marginBottom: '200px', }}>GRID 2</h1>
                <h1 style={{ marginBottom: '200px', }}>GRID 2</h1>
                <h1 style={{ marginBottom: '200px', }}>GRID 2</h1>
                <h1 style={{ marginBottom: '200px', }}>GRID 2</h1>
            </Grid>
        </Grid>
    )
}

export default GridTest