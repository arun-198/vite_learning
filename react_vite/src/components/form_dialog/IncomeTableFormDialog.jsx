import styles from "./component_styles/IncomeTableFormDialog.module.css"
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import PropTypes from "prop-types";

export default function IncomeTableFormDialog({selectedMonth,open,setOpen}) {

    const handleClose = () => {
        setOpen(false);
      };

    return(
        <Dialog
              open={open}
              onClose={handleClose}
              PaperProps={{
                component: 'form',
                onSubmit: (event) => { 
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  let formJson = Object.fromEntries(formData.entries());
                  console.log(formJson);
                  setOpen(false);
                },
              }}
              className={styles.formDialog}
        >
            <DialogTitle>Add Inflow for {selectedMonth}</DialogTitle>
            <DialogContent>
                <TextField
                              autoFocus
                              margin="dense"
                              id="inflowType"
                              name="inflowType"
                              label="Inflow"
                              type="string"
                              fullWidth
                              variant="standard"
                            />
                <TextField
                              autoFocus
                              margin="dense"
                              id="amount"
                              name="amount"
                              label="Amount"
                              type="number"
                              fullWidth
                              variant="standard"
                            />
                <TextField
                              autoFocus
                              margin="dense"
                              id="date"
                              name="date"
                              label=""
                              type="date"
                              fullWidth
                              variant="standard"
                            />
            </DialogContent>
        </Dialog>
        

    )
}

IncomeTableFormDialog.propTypes = {
    selectedMonth: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired
  };