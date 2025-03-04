import styles from "./IncomeTableFormDialog.module.css"
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import PropTypes from "prop-types";
import { updateInflowsByMonth } from "../../../services/IncomeApi";

export default function IncomeTableFormDialogUpdate({selectedMonth,inflowItem,selectedInflows,setSelectedInflows,openUpdate,setOpenUpdate}) {

    const handleCloseUpdate = () => {
        setOpenUpdate(false);
      };

    const handleItemUpdate = (updatedItem) => {
        console.log(updatedItem);
        let updatedInflows = [
            ...selectedInflows
        ];
        updatedInflows[inflowItem.id-1].inflowType = updatedItem.inflowType;
        if (updatedItem.amount === '0') {
            updatedInflows[inflowItem.id-1].amount = 0;
        } else if (updatedItem.amount !== "") {
            updatedInflows[inflowItem.id-1].amount = updatedItem.amount;
        }
        updatedInflows[inflowItem.id-1].date = updatedItem.date;

        let updatedInflowsByMonth = {};
        updatedInflowsByMonth['month']=selectedMonth;
        updatedInflowsByMonth['inflows']=updatedInflows;
        console.log(updatedInflowsByMonth);
        updateInflowsByMonth(selectedMonth, updatedInflowsByMonth);
        setSelectedInflows(updatedInflows);

    }

    return(
        <Dialog
              open={openUpdate}
              onClose={handleCloseUpdate}
              PaperProps={{
                component: 'form',
                onSubmit: (event) => { 
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  let formJson = Object.fromEntries(formData.entries());
                  console.log(formJson);
                  handleItemUpdate(formJson);
                  setOpenUpdate(false);
                },
              }}
              className={styles.formDialog}
        >
            <DialogTitle>Update Inflow for {selectedMonth}</DialogTitle>
            <DialogContent>
                <TextField
                              autoFocus
                              disabled
                              margin="dense"
                              id="inflowType"
                              name="inflowType"
                              label={inflowItem.id}
                              type="number"
                              fullWidth
                              variant="standard"
                            />
                <TextField
                              autoFocus
                              margin="dense"
                              id="inflowType"
                              name="inflowType"
                              label={inflowItem.inflowType}
                              defaultValue={inflowItem.inflowType}
                              type="string"
                              fullWidth
                              variant="standard"
                            />
                <TextField
                              autoFocus
                              margin="dense"
                              id="amount"
                              name="amount"
                              label={inflowItem.amount}
                              defaultValue={inflowItem.amount}
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
                              defaultValue={inflowItem.date}
                              type="date"
                              fullWidth
                              variant="standard"
                            />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseUpdate}>Cancel</Button>
                <Button type="submit">Update</Button>
            </DialogActions>
        </Dialog>
        
    )
}

IncomeTableFormDialogUpdate.propTypes = {
    selectedMonth: PropTypes.string.isRequired,
    inflowItem: PropTypes.object.isRequired,
    selectedInflows: PropTypes.array.isRequired,
    setSelectedInflows: PropTypes.func.isRequired,
    openUpdate: PropTypes.bool.isRequired,
    setOpenUpdate: PropTypes.func.isRequired
}