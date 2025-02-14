// import * as React from 'react';
import styles from "./component_styles/FormDialogUpdate.module.css"
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
// import FormControl from '@mui/material/FormControl';

// import MenuItem from '@mui/material/MenuItem';
import PropTypes from "prop-types";
import {updateExpenseCatByMonth} from '../services/ExpenseApi';



export default function FormDialogUpdate({selectedMonth,expenseCatUpdate,selectedExpenses,setSelectedExpenses,openUpdate,setOpenUpdate}) {

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleExpenseCatChange = (updatedExpenseCat) => {
          console.log(updatedExpenseCat);
          console.log('Updating expense cat');
          let newExpenseCat = [
            ...selectedExpenses
        ];
          console.log(newExpenseCat);
          let foundIndex = newExpenseCat.findIndex(item => item.id === updatedExpenseCat.id);
          console.log(foundIndex);
          if (foundIndex !== -1) {
            if (updatedExpenseCat.expenseCat !== "") {
              newExpenseCat[foundIndex].expenseCat = updatedExpenseCat.expenseCat;
            }
            if (updatedExpenseCat.budget === '0') {
              console.log('Budget is 0');
              newExpenseCat[foundIndex].budget = 0;
            } else if (updatedExpenseCat.budget !== "") {
              console.log('Budget is not empty');
              newExpenseCat[foundIndex].budget = parseFloat(updatedExpenseCat.budget);
            }
            let newExpenseMonth = {};
            newExpenseMonth['month']=selectedMonth;
            newExpenseMonth['expenses']=newExpenseCat;
            console.log(newExpenseMonth);
            //setExpenseMonths(updatedExpensesCat);
            updateExpenseCatByMonth(selectedMonth,newExpenseMonth);
      
            // Update selectedExpenses
            setSelectedExpenses(newExpenseCat);
              
          }
        }


  return (
    <Dialog
      open={openUpdate}
      onClose={handleCloseUpdate}
      PaperProps={{
        component: 'form',
        onSubmit: (event) => { 
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          let formJson = Object.fromEntries(formData.entries());
          formJson.id = expenseCatUpdate.id;
          handleExpenseCatChange(formJson);
          console.log(formJson);
          setOpenUpdate(false);
        },
      }}
      className={styles.formDialog}
    >
      <DialogTitle>Update Expense for {selectedMonth}</DialogTitle>
      <DialogContent>
      <TextField
              autoFocus
              disabled
              margin="dense"
              id="id"
              name="id"
              label={expenseCatUpdate.id}
              type="string"
              fullWidth
              variant="standard"
            />
        <TextField
              autoFocus
              
              margin="dense"
              id="expenseCat"
              name="expenseCat"
              label={expenseCatUpdate.expenseCat}
              defaultValue={expenseCatUpdate.expenseCat}
              type="string"
              fullWidth
              variant="standard"
            />
        <TextField
              autoFocus
              
              margin="dense"
              id="budget"
              name="budget"
              label={expenseCatUpdate.budget}
              defaultValue={expenseCatUpdate.budget}
              type="number"
              fullWidth
              variant="standard"
            />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseUpdate}>Cancel</Button>
        <Button type="submit">Update</Button>
      </DialogActions>
    </Dialog>
  );
}


FormDialogUpdate.propTypes = {
  selectedMonth: PropTypes.string.isRequired,
  expenseCatUpdate: PropTypes.string.isRequired,
  selectedExpenses: PropTypes.object.isRequired,
  setSelectedExpenses: PropTypes.func.isRequired,
  openUpdate: PropTypes.bool.isRequired,
  setOpenUpdate: PropTypes.func.isRequired
  };