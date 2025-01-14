import { Box, Tabs, Tab, Typography } from "@mui/material";
import * as React from 'react';


export default function Expense() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
     
    return (
        <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
        <Typography>
            <h2>
                Expenses for 2024
            </h2>
        </Typography>
      <br></br>
        <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Jan" />
            <Tab label="Feb" />
            <Tab label="Mar" />
        </Tabs>
    </Box>
    )
};
