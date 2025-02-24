
import styles from "./component_styles/ExpenseTableFormDialogUpdate.module.css"
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from "prop-types";
// import FormControl from '@mui/material/FormControl';
 
// import MenuItem from '@mui/material/MenuItem';

import {updateExpenseCatByMonth} from '../../services/ExpenseApi';


export default function ExpenseTableFormDialogItemUpdate({itemUpdate, setItemUpdate, itemArray, selectedExpenses, setSelectedExpenses, selectedMonth}) {


    const handleCloseFormUpdate = () => {
        setItemUpdate(false);
      };

    const handleExpenseItemChange = (updatedExpenseItem) => {
      console.log('Updating expense item');
      let newExpenseCat = [
        ...selectedExpenses
    ];
    let foundIndex = newExpenseCat.findIndex(item => item.expenseCat === itemArray[0]);
    if (foundIndex !== -1) {
      newExpenseCat[foundIndex].spent = newExpenseCat[foundIndex].spent - parseFloat(itemArray[1].spent) + parseFloat(updatedExpenseItem.spent);
      newExpenseCat[foundIndex].date = updatedExpenseItem.date;

      let foundItemIndex = newExpenseCat[foundIndex].expenseItems.findIndex(expenseItem => expenseItem.expense === itemArray[1].expense);
      if (foundItemIndex != 1) {
        newExpenseCat[foundIndex].expenseItems[foundItemIndex].expense = updatedExpenseItem.expense;
        newExpenseCat[foundIndex].expenseItems[foundItemIndex].spent = updatedExpenseItem.spent;
        newExpenseCat[foundIndex].expenseItems[foundItemIndex].date = updatedExpenseItem.date;

        let newExpenseMonth = {};
        newExpenseMonth['month']=selectedMonth;
        newExpenseMonth['expenses']=newExpenseCat;
        updateExpenseCatByMonth(selectedMonth,newExpenseMonth);
              
        // Update selectedExpenses
        setSelectedExpenses(newExpenseCat);
      }
    }

    }
  
    return (
        <Dialog
        open={itemUpdate}
        onClose={handleCloseFormUpdate}
        PaperProps={{
            component: 'form',
            onSubmit: (event) => { 
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            let formJson = Object.fromEntries(formData.entries());
            //formJson.orig = itemArray[1].expense;
            handleExpenseItemChange(formJson);
            console.log(formJson);
            setItemUpdate(false);
            },
        }}
        className={styles.formDialog}
        >
        <DialogTitle>Update Expense Item</DialogTitle>
        <DialogContent>
        <TextField
                      autoFocus
                      disabled
                      margin="dense"
                      id="id"
                      name="id"
                      label={itemArray[0]}
                      type="string"
                      fullWidth
                      variant="standard"
                    />
                <TextField
                      autoFocus
                      
                      margin="dense"
                      id="expense"
                      name="expense"
                      label="expense"
                      defaultValue={itemArray[1].expense}
                      type="string"
                      fullWidth
                      variant="standard"
                    />
                <TextField
                      autoFocus
                      margin="dense"
                      id="spent"
                      name="spent"
                      label="spent"
                      defaultValue={itemArray[1].spent}
                      type="number"
                      fullWidth
                      variant="standard"
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="date"
                      name="date"
                      label="date"
                      defaultValue={itemArray[1].date}
                      type="date"
                      fullWidth
                      variant="standard"
                    />
            
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseFormUpdate}>Cancel</Button>
            <Button type="submit">Update</Button>
        </DialogActions>
        </Dialog>
    );
}

ExpenseTableFormDialogItemUpdate.propTypes = {
  itemUpdate: PropTypes.bool.isRequired,
  setItemUpdate: PropTypes.func.isRequired,
  itemArray: PropTypes.array.isRequired,
  selectedExpenses: PropTypes.array.isRequired,
  setSelectedExpenses: PropTypes.func.isRequired,
  selectedMonth: PropTypes.string.isRequired
  };

