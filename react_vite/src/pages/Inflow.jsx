
import { Box, Tabs, Tab, Typography } from "@mui/material";
import React from "react";
import IncomeTable from "../components/IncomeTable";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import { getInflows, getInflowsByMonth } from "../services/IncomeApi";
import IncomeTableFormDialog from "../components/form_dialog/IncomeTableFormDialog";
import IncomeTableFormDialogUpdate from "../components/form_dialog/component_styles/IncomeTableFormDIalogUpdate";

export default function Inflow() {

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
    const [value, setValue] = React.useState(getCurrentMonthIndex());
    const [selectedMonth, setSelectedMonth] = React.useState(months[getCurrentMonthIndex()]);
    const [selectedInflows, setSelectedInflows] = React.useState([]); 
    const [open, setOpen] = React.useState(false);

    const [inflowItem, setInflowItem] = React.useState({});
    const [openUpdate, setOpenUpdate] = React.useState(false);

    const buttonContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      };

    const handleChange = (event, newValue) => { 
        console.log(newValue);
        setValue(newValue);
        setSelectedMonth(months[newValue]);
        fetchInflowsForMonth(months[newValue])
    }

    React.useEffect(() => {
          const fetchItems = async () => {
            try {
              const data = await getInflows();
              console.log(data[value].inflows);
              setSelectedInflows(data[value].inflows);
            } catch (err) { // Catch the error re-thrown from the API function
              console.log(err.message); // Or a more user-friendly message
              console.error("Inflow error:", err); // Keep logging the detailed error
            } 
          };
      
          fetchItems();
        }, []);
    
        const fetchInflowsForMonth = async (targetMonth) => {
          try {
            const data = await getInflowsByMonth(targetMonth);
            console.log(data);
            setSelectedInflows(data.inflows);
          } catch (err) {
            setSelectedInflows([]);
            console.error("Inflow Month error:", err);
          } 
        }

        const handleClickOpen = () => {
            setOpen(true);
          };

        const handleClickEdit = (id) => {
          setInflowItem(selectedInflows[id-1]);
          setOpenUpdate(true);
        }

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
            <Typography variant="h4" gutterBottom>
                    Inflows for 2025
            </Typography>

            <br></br>
            <Tabs value={value} onChange={handleChange} centered>
                {months.map((month) => (
                    <Tab key={month} label={month} />
                ))}
            </Tabs>
            <br />
            <IncomeTableFormDialog 
              selectedMonth={selectedMonth} 
              selectedInflows={selectedInflows}
              setSelectedInflows={setSelectedInflows} 
              open={open} setOpen={setOpen} />
            <IncomeTableFormDialogUpdate 
              selectedMonth={selectedMonth}
              inflowItem={inflowItem}
              selectedInflows={selectedInflows}
              setSelectedInflows={setSelectedInflows}  
              openUpdate={openUpdate}
              setOpenUpdate={setOpenUpdate}/>
            <IncomeTable 
              selectedMonth={selectedMonth} 
              selectedInflows={selectedInflows}
              handleClickEdit={handleClickEdit} 
              setSelectedInflows={setSelectedInflows} />
            <br />
            <div style={buttonContainerStyle}> {/* Container for buttons */}
                <Button variant="contained" endIcon={<AddIcon />} onClick={handleClickOpen}> 
                    Add
                </Button>
            </div>
        </Box>

    )
};