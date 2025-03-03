import styles from "./component_styles/IncomeTableFormDialog.module.css"
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import PropTypes from "prop-types";
import Button from '@mui/material/Button';
import { addInflowsByMonth } from "../../services/IncomeApi";

export default function IncomeTableFormDialog({selectedMonth,selectedInflows, setSelectedInflows,open,setOpen}) {

    const handleClose = () => {
        setOpen(false);
      };

    const handleAddInflow = (inflow) => {
      let updatedInflows = [
        ...selectedInflows
      ];
      updatedInflows.push(inflow);
      let newInflowMonth = {};
      newInflowMonth['month']=selectedMonth;
      newInflowMonth['inflows']=updatedInflows;
      console.log(newInflowMonth);
      addInflowsByMonth(selectedMonth, newInflowMonth);
      setSelectedInflows(updatedInflows);
    }

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
                  formJson["id"] = selectedInflows.length + 1;
                  console.log(formJson);
                  handleAddInflow(formJson);
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
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </Dialog>
        

    )
}

IncomeTableFormDialog.propTypes = {
    selectedMonth: PropTypes.string.isRequired,
    selectedInflows: PropTypes.array.isRequired,
    setSelectedInflows: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired
  };