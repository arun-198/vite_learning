import styles from "./IncomeTable.module.css";
import PropTypes from "prop-types";

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteInflowsByMonth } from "../services/IncomeApi";

export default function IncomeTable({selectedMonth,selectedInflows,handleClickEdit, setSelectedInflows}) {

    console.log(selectedMonth);

    const handleDeleteInflow = (id) => {
        let updatedInflow = [
            ...selectedInflows
        ];
        updatedInflow.splice(id-1);
        updatedInflow.forEach((item, newIndex) => {
            item.id = newIndex + 1;
          });
          let newInflowMonth = {};
          newInflowMonth['month'] = selectedMonth;
          newInflowMonth['inflows'] = updatedInflow;
          console.log(newInflowMonth);
          deleteInflowsByMonth(selectedMonth,newInflowMonth);
          setSelectedInflows(updatedInflow);
    }
    
    return(
        <div className={styles.container}>
            <ul className={styles.responsiveTable}>
                <li className={styles.tableHeader}>
                <div className={styles.col1}>No</div>
                <div className={styles.col2}>Inflow</div>
                <div className={styles.col3}>Amount</div>
                <div className={styles.col4}>Date</div>
                <div className={styles.col5}>Actions</div>
                </li>
            
                {selectedInflows.map((inflow, index) => (
                    <li className={styles.tableRow} key={index}>
                        <div className={styles.col1} data-label="No">{inflow.id}</div>
                        <div className={styles.col2} data-label="Inflow">{inflow.inflowType}</div>
                        <div className={styles.col3} data-label="Amount">{inflow.amount}</div>
                        <div className={styles.col4} data-label="Date">{inflow.date}</div>
                        <div className={styles.col5}>
                            <IconButton sx={{'&:hover': {backgroundColor: 'grey'}}} size="small" aria-label="edit expense cart" onClick={()=>handleClickEdit(inflow.id)}>
                                <EditIcon style={{ fill: 'black' }}/>
                            </IconButton>
                            <IconButton sx={{'&:hover': {backgroundColor: 'grey'}}} size="small" aria-label="delete expense cart" onClick={()=>handleDeleteInflow(inflow.id)}>
                                <DeleteIcon style={{ fill: 'black' }}/>
                            </IconButton>
                        </div>
                    </li>
                ))}
                </ul>
                
        </div>

    )
}

IncomeTable.propTypes = {
    selectedMonth: PropTypes.string.isRequired,
    selectedInflows: PropTypes.array.isRequired,
    handleClickEdit: PropTypes.func.isRequired,
    setSelectedInflows: PropTypes.func.isRequired
}