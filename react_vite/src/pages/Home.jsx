import  { Box,Typography } from "@mui/material";

export default function Home() {

    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];

    function getCurrentMonthIndex() {
      const currentDate = new Date();
      console.log(currentDate);
      const currentMonthIndex = currentDate.getMonth();
      
      return currentMonthIndex;
    }

    return(
        <Box
            sx={{py: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start', // Change alignItems to flex-start
                textAlign: 'left'}}>
                
        

            <Typography variant="h2" gutterBottom sx={{fontWeight:'600',fontSize:'1.5rem',marginLeft:'1.5vw'}}>
                        {months[getCurrentMonthIndex()]}
            </Typography>
            
        </Box>
        
    )
}