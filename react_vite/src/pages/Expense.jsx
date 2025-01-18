import { Box, Tabs, Tab, Typography } from "@mui/material";
import * as React from 'react';
import ExpenseTable from "../components/expenseTable";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

  
export default function Expense() {

    const expensesByMonth = {
        Jan: [
          { expenseType: "Travel", amount: 120, cat: "Gen", date: "01/01/2025" },
          { expenseType: "Insurance", amount: 100, cat: "Gen", date: "01/01/2025" },
          { expenseType: "Tax", amount: 200, cat: "Gen", date: "01/01/2025" },
          { expenseType: "Misc", amount: 500, cat: "Gen", date: "01/01/2025" },
        ],
        Feb: [
          { expenseType: "Travel", amount: 150, cat: "Gen", date: "01/02/2025" },
          { expenseType: "Utilities", amount: 90, cat: "Gen", date: "01/02/2025" },
        ],
        Mar: [
          { expenseType: "Food", amount: 300, cat: "Gen", date: "01/03/2025" },
          { expenseType: "Rent", amount: 700, cat: "Gen", date: "01/03/2025" },
        ],
      };
    const [value, setValue] = React.useState(2);
    const [selectedExpenses, setSelectedExpenses] = React.useState(expensesByMonth.Mar); // Default to Jan expenses

    const handleChange = (event, newValue) => {
        setValue(newValue);
        // Update the selectedExpenses based on the tab
        const month = Object.keys(expensesByMonth)[newValue];
        setSelectedExpenses(expensesByMonth[month]);
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
        <br />
      <ExpenseTable expenses={selectedExpenses} />
      <br />
       <Button variant="contained" endIcon={<AddIcon />}>
        Add
       </Button>
    </Box>
    
    )
};
