import * as React from 'react';
import styles from "./component_styles/FormDialog.module.css"
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from "prop-types";

import {updateExpensesByMonth} from '../services/ExpenseApi';

export default function FormDialog({ selectedExpenses, selectedMonth, setSelectedExpenses,expenseCatArray, open, setOpen}) {

    //const [open, setOpen] = React.useState(false);
    const [formType, setFormType] = React.useState('Expense Category'); // Default form type
    console.log(selectedExpenses);
    //const expenseCats = selectedExpenses.map(expenseCat => expenseCat.expenseCat) || [];

    const handleClose = () => {
        setOpen(false);
      };

    const handleFormTypeChange = (event) => {
        setFormType(event.target.value);
      };

    
      const handleExpenseCatMth = (addedExpenseCat) => {
        addedExpenseCat.spent = 0;
        addedExpenseCat.date = ' ';
        addedExpenseCat.expenseItems = {};
        let updatedExpensesCat = [
          ...selectedExpenses // Copy the existing state  
        ];
        addedExpenseCat.id=updatedExpensesCat.length+1;
        updatedExpensesCat.push(addedExpenseCat);
        let newExpenseMonth = {};
        newExpenseMonth['month']=selectedMonth;
        newExpenseMonth['expenses']=updatedExpensesCat;
        console.log(updatedExpensesCat);
        console.log(`Length of expenses for this month: ${updatedExpensesCat.length}`)
        //setExpenseMonths(updatedExpensesCat);
        updateExpensesByMonth(selectedMonth,newExpenseMonth);
  
        // Update selectedExpenses
        setSelectedExpenses(updatedExpensesCat);
        
      }
  
      const handleExpenseMth = (addedExpense) => {
        console.log(addedExpense);
        console.log('Adding expense');
        let newExpense = {
          expense: addedExpense.expense,
          spent: addedExpense.spent,
          date: addedExpense.date,
        };
        // newExpense["expense"] = addedExpense.expense;
        // newExpense["spent"] = addedExpense.spent;
        // newExpense["date"] = addedExpense.date;
        
        let newExpenseCat = [
          ...selectedExpenses
      ];
        console.log(newExpenseCat);
        let foundIndex = newExpenseCat.findIndex(item => item.expenseCat === addedExpense.expenseCat);
        console.log(foundIndex);
        if (foundIndex !== -1) {
          newExpenseCat[foundIndex].spent += addedExpense.spent;

          // Correct Date Handling (Example - assuming date is a string)
          newExpenseCat[foundIndex].date = addedExpense.date; // Or handle date updates appropriately
          // Initialize expenseItems as an array if it's not already
          if (!Array.isArray(newExpenseCat[foundIndex].expenseItems)) {
            newExpenseCat[foundIndex].expenseItems = [];
          }
          newExpenseCat[foundIndex].expenseItems.push(newExpense);
          let newExpenseMonth = {};
          newExpenseMonth['month']=selectedMonth;
          newExpenseMonth['expenses']=newExpenseCat;
          console.log(newExpenseMonth);
          //setExpenseMonths(updatedExpensesCat);
          updateExpensesByMonth(selectedMonth,newExpenseMonth);
    
          // Update selectedExpenses
          setSelectedExpenses(newExpenseCat);
            
        } 
        
        
        
      }

    return (
        <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());

          if (formType === 'Expense Category') {
            formJson.budget = parseFloat(formJson.budget);
            handleExpenseCatMth(formJson);
          } else if (formType === 'Expense') {
            formJson.spent = parseFloat(formJson.spent); // Parse spent as a number
            handleExpenseMth(formJson); // Or a different handler if needed
          }

          console.log(formJson);
          handleClose();
        },
      }}
      className={styles.formDialog}
    >
      <DialogTitle>New {formType}</DialogTitle> {/* Dynamic title */}
      <DialogContent>
        <FormControl fullWidth margin="dense">
          <InputLabel id="form-type-label">Form Type</InputLabel>
          <Select
            labelId="form-type-label"
            id="form-type"
            value={formType}
            label="Form Type"
            onChange={handleFormTypeChange}
          >
            <MenuItem value="Expense Category">Expense Category</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>

        {formType === 'Expense Category' ? (
          <>
            <TextField
              autoFocus
              required
              margin="dense"
              id="expenseCat" // Use id for better accessibility
              name="expenseCat"
              label="Expense Cat"
              type="string"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="budget" // Use id for better accessibility
              name="budget"
              label="Budget"
              type="float"
              fullWidth
              variant="standard"
            />
          </>
        ) : (
          <>
            <FormControl fullWidth variant="standard" margin="dense"> {/* Wrap with FormControl */}
            <InputLabel id="expenseCat-label">Expense Category</InputLabel> {/* Add InputLabel */}
            <Select
                labelId="expenseCat-label" // Connect label and select
                id="expenseCat"
                name="expenseCat"
                //value={expenseCat} // Bind the value (important!)
                label="Expense Category" // Set the label
                //onChange={handleExpenseCatChange} // Add onChange handler
            >
                {/* Map your options here */}
                {expenseCatArray.map((category) => (
                    <MenuItem key={category} value={category}>
                        {category}
                    </MenuItem>
                ))}

            </Select>
        </FormControl>
            <TextField
              autoFocus
              required
              margin="dense"
              id="expense" // Use id for better accessibility
              name="expense"
              label="Expense Name"
              type="string"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="spent" // Use id for better accessibility
              name="spent"
              label="Spent"
              type="float"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="date" // Use id for better accessibility
              name="date"
              label=""
              type="date" // Use type="date" for date input
              fullWidth
              variant="standard"
              
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Add</Button>
      </DialogActions>
    </Dialog>
    )
}


FormDialog.propTypes = {
    //handleExpenseCatMth: PropTypes.var.isRequired,
    //handleExpenseMth: PropTypes.var.isRequired,
    selectedExpenses: PropTypes.object.isRequired,
    selectedMonth: PropTypes.string.isRequired,
    setSelectedExpenses: PropTypes.func.isRequired,
    expenseCatArray:PropTypes.array.isRequired,
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired
  };