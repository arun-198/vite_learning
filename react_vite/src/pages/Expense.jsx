import styles from "./Expense.module.css"
import { Box, Tabs, Tab, Typography } from "@mui/material";
import * as React from 'react';
import ExpenseTable from "../components/ExpenseTable";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ExpenseTableFormDialog from "../components/form_dialog/ExpenseTableFormDialog";

import {getExpenses, getExpensesByMonth} from '../services/ExpenseApi';
import ExpenseTableFormDialogUpdate from "../components/form_dialog/ExpenseTableFormDialogUpdate";
import ExpenseTableFormDialogItemUpdate from "../components/form_dialog/ExpenseTableFormDialogItemUpdate";

//import DialogContentText from '@mui/material/DialogContentText';
  
export default function Expense() {

    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    function getCurrentMonthIndex() {
      const currentDate = new Date();
      console.log(currentDate);
      const currentMonthIndex = currentDate.getMonth();
      
      return currentMonthIndex;
    }

    const [expenseMonths, setExpenseMonths] = React.useState(new Object()); //Sample data for all months
    const [value, setValue] = React.useState(getCurrentMonthIndex());
    const [selectedMonth, setSelectedMonth] = React.useState(months[getCurrentMonthIndex()]);
    const [selectedExpenses, setSelectedExpenses] = React.useState([]); // Default to Jan expenses
    const [open, setOpen] = React.useState(false);
    const [showExpenseTable, setShowExpenseTable] = React.useState(true);
    const [expenseCatArray,setExpenseCatArray] = React.useState([]);
    const [showExpenseBtn, setShowExpenseBtn] = React.useState(false);
    //const [formDialogAction, setFormDialogAction] = React.useState("");

    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [expenseCatUpdate, setExpenseCatUpdate] = React.useState({});

    const [itemUpdate, setItemUpdate] = React.useState(false);
    const [itemArray, setItemArray] = React.useState(["default", {"expense": "default","spent": 0,"date": "default"}]);


    const handleChange = (event, newValue) => { 
        console.log(newValue);
        setValue(newValue);
        // Update the selectedExpenses based on the tab
        //const month = Object.keys(expenseMonths)[newValue];
        //const selectedMonthData = expenseMonths[newValue];
        setSelectedMonth(months[newValue]);
        //setSelectedExpenses(expenseMonths[newValue].expenses);
        fetchExpensesForMonth(months[newValue]);
        setExpenseCatArray(selectedExpenses.expenses.map(expenseItems => expenseItems.expenseCat));
        if (selectedExpenses && selectedExpenses.expenses) {
          // setSelectedMonth(months[newValue]);
          // //setSelectedExpenses(expenseMonths[newValue].expenses);
          // fetchExpensesForMonth(months[newValue]);
          setExpenseCatArray(selectedExpenses.expenses.map(expenseItems => expenseItems.expenseCat));
          console.log(expenseMonths[newValue].expenses);
        } else {
          // console.log("No expenses found for this month.");
          // setSelectedMonth(months[newValue]); // Still set the selected month
          // setSelectedExpenses([]); // Or some default value/empty array
          // setExpenseCatArray([]); // Or some default value/empty array
          //setShowExpenseTable(false); // Hide the table if no data

        }
        setShowExpenseBtn(false);
        setShowExpenseTable(true);
        
    };

    
   
    const handleClickOpen = () => {
      console.log(`expense category array: ${expenseCatArray}`);
      setOpen(true);
    };

    const handleClickUpdate = (expensecategory) => {
      console.log(`expense category array: ${expensecategory.expenseCat}`);
      setExpenseCatUpdate(expensecategory);
      setOpenUpdate(true);
    };

    const handleShowExpenseBtn = () => {
      setShowExpenseTable(true);
      setShowExpenseBtn(false);

    }

    React.useEffect(() => {
      const fetchItems = async () => {
        try {
          const data = await getExpenses();
          console.log(data[value].expenses);
          setExpenseMonths(data);
          setSelectedExpenses(data[0].expenses);
          setExpenseCatArray(data[0].expenses.map(expenseItems => expenseItems.expenseCat));
        } catch (err) { // Catch the error re-thrown from the API function
          console.log(err.message); // Or a more user-friendly message
          console.error("Expense error:", err); // Keep logging the detailed error
        } 
      };
  
      fetchItems();
    }, []);

    const fetchExpensesForMonth = async (targetMonth) => {
      try {
        const data = await getExpensesByMonth(targetMonth);
        console.log(data);
        //setExpenseMonths(data);
        setSelectedExpenses(data.expenses);
        setExpenseCatArray(data.expenses.map(expenseItems => expenseItems.expenseCat));
        setShowExpenseBtn(false);
        setShowExpenseTable(true);
      } catch (err) {
        setSelectedExpenses([]);
        setExpenseCatArray([]);
        console.error("Expense Month error:", err);
        setShowExpenseBtn(false);
        setShowExpenseTable(true);
      } 
    }
  
    const handleClickItemUpdate = (a,b) => {
      console.log(`Updating ${b} from ${a}`);
      setItemArray([a,b]);
      setItemUpdate(true);
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
                Expenses for 2025
        </Typography>

        <br></br>

        <Tabs value={value} onChange={handleChange} centered>
          {/* <Tab label="Jan" />
          <Tab label="Feb" />
          <Tab label="Mar" /> */}
          {months.map((month) => (
            <Tab key={month} label={month} />
          ))}
        </Tabs>
        <br />
      <ExpenseTableFormDialog 
        selectedExpenses={selectedExpenses}
        selectedMonth={selectedMonth}
        setSelectedExpenses={setSelectedExpenses}
        expenseCatArray={expenseCatArray}
        setExpenseCatArray={setExpenseCatArray}
        open={open} setOpen={setOpen} />
      <ExpenseTable 
        expenses={selectedExpenses} 
        selectedMonth={selectedMonth}
        setSelectedExpenses={setSelectedExpenses}
        showExpenseTable={showExpenseTable} 
        setShowExpenseTable={setShowExpenseTable}
        expenseCatArray={expenseCatArray}
        handleClickUpdate={handleClickUpdate}
        setExpenseCatArray={setExpenseCatArray}
        handleClickItemUpdate={handleClickItemUpdate}
        setShowExpenseBtn={setShowExpenseBtn}/>
      <ExpenseTableFormDialogUpdate 
        selectedMonth={selectedMonth}
        expenseCatUpdate={expenseCatUpdate}
        selectedExpenses={selectedExpenses}
        setSelectedExpenses={setSelectedExpenses}
        openUpdate={openUpdate} setOpenUpdate={setOpenUpdate} />
      <ExpenseTableFormDialogItemUpdate
        itemUpdate={itemUpdate} 
        setItemUpdate={setItemUpdate} 
        itemArray={itemArray}
        selectedExpenses={selectedExpenses}
        setSelectedExpenses={setSelectedExpenses}
        selectedMonth={selectedMonth}/>
      <br />
      <div className={styles.buttonFlexBox}> {/* Container for buttons */}
        <Button variant="contained" endIcon={<AddIcon />} onClick={handleClickOpen}>
          Add
        </Button>
        
        {showExpenseBtn && <Button variant="contained" onClick={handleShowExpenseBtn}>Expenses</Button>}
      </div>
            
    </Box>
    
    )
};
