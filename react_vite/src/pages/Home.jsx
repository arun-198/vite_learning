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
            sx={{
                py: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
                textAlign: 'center',
            }}
            >
                <Box 
                    sx={{
                        width: 220,
                        height: 90,
                        borderRadius: 1,
                        marginLeft:'5vw',
                        alignContent: 'center',
                        bgcolor: '#b3b1b1',
                        '&:hover': {
                            bgcolor: '#7b7777',
                        },
                    }}
                >
                    <Typography variant="h6" gutterBottom sx={{color:'#4c4d4f', marginTop:'0.6vh', marginBottom:'0'}}>
                            Latest
                    </Typography>
                    <Typography variant="h4" gutterBottom sx={{color:'black'}}>
                            {months[getCurrentMonthIndex()]}
                    </Typography>
                    
                </Box>
            
        </Box>
        
    )
}