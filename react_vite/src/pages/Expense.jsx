import styles from "./Expense.module.css"
import { Box, Tabs, Tab, Typography } from "@mui/material";
import * as React from 'react';
import ExpenseTable from "../components/expenseTable";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


  
export default function Expense() {

    const expensesByMonth = {
        Jan: [
          { expenseCat: "Work", budget: 120, spent: 0, date: "01/01/2025" },
          
        ],
        
      };

    const [expenseJan, setExpenseJan] = React.useState(expensesByMonth);
    const [value, setValue] = React.useState(0);
    const [selectedExpenses, setSelectedExpenses] = React.useState(expenseJan.Jan); // Default to Jan expenses
    const [open, setOpen] = React.useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        // Update the selectedExpenses based on the tab
        const month = Object.keys(expenseJan)[newValue];
        setSelectedExpenses(expenseJan[month]);
    };

    const handleExpenseJan = (addedExpense) => {
      addedExpense.spent = 0;
      addedExpense.date = ' ';
      const updatedExpenses = {
        ...expenseJan, // Copy the existing state
        Jan: [...expenseJan.Jan, addedExpense], // Update the Jan array
      };
      console.log(updatedExpenses);
      setExpenseJan(updatedExpenses);
      // Update selectedExpenses if currently viewing the Jan tab
      if (value === 0) {
        setSelectedExpenses(updatedExpenses.Jan);
      }
    }

   
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
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
        <Typography variant="h4" gutterBottom>
                Expenses for 2024
        </Typography>
      <br></br>
        <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Jan" />
            <Tab label="Feb" />
            <Tab label="Mar" />
        </Tabs>
        <br />
        <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form', 
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            formJson.budget = parseFloat(formJson.budget);
            handleExpenseJan(formJson);
            console.log(formJson);
            handleClose();
          },
        }}
        className={styles.formDialog}
      >
        <DialogTitle >New Expense Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the following: 
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="expenseCat"
            label="Expense Cat"
            type="string"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="budget"
            label="Budget"
            type="number"
            
            variant="standard"
          />
          
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
      <ExpenseTable expenses={selectedExpenses} />
      <br />
       <Button variant="contained" endIcon={<AddIcon />} onClick={handleClickOpen}> 
        Add
       </Button>
       
    </Box>
    
    )
};
