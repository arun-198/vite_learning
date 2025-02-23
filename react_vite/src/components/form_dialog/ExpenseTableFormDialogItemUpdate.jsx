
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


export default function ExpenseTableFormDialogItemUpdate({itemUpdate, setItemUpdate, itemArray}) {


    const handleCloseFormUpdate = () => {
        setItemUpdate(false);
      };
  
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
  };

