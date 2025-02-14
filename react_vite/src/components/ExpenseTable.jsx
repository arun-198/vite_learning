import styles from "./ExpenseTable.module.css"
import PropTypes from "prop-types";
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {updateExpensesByMonth} from '../services/ExpenseApi';

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

export default function ExpenseTable({ expenses,selectedMonth,setSelectedExpenses, showExpenseTable, setShowExpenseTable, expenseCatArray, setExpenseCatArray, handleClickUpdate, setShowExpenseBtn }) {

  //let ExpenseCatList = ['Travel','Food'];
  const [expenseCat, setExpenseCat] = React.useState(expenseCatArray[0]); 
  const [expenseItems, setExpenseItems] = React.useState([]);

  const BorderLinearProgress = styled(LinearProgress)(({ theme, value }) => ({ // Add value prop
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[200],
      ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.grey[800],
      }),
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: value === 100 ? '#8f0029' : '#1a90ff', // Conditional color
      ...theme.applyStyles('dark', {
        backgroundColor: value === 100 ? '#8f0029' : '#308fe8', // Conditional color in dark mode
      }),
    },
  }));


    const openExpense = ( expenseCat ) => {
      console.log(`Expense selected: ${expenseCat}`);
      console.log(`Expense selected: ${expenseItems}`);
      console.log(typeof expenseItems);
      //console.log(`Expense Items: ${expenseItems}`)
      setExpenseCat(expenseCat);
      setExpenseItems(()=>{
        
        const matchingExpense = expenses.find(expense => expense.expenseCat === expenseCat);
        console.log(matchingExpense.expenseItems);
        if (matchingExpense) {
          return matchingExpense.expenseItems;
        } else {
            return []; // Return an empty array if no match is found
        }
      })
      setShowExpenseBtn(true);
      setShowExpenseTable(false);
    }

    const deleteExpenseCatMth = (expenseCatName) => {
      let updatedExpenseCat = [
        ...expenses
      ];
      console.log(updatedExpenseCat);
      let foundIndex = updatedExpenseCat.findIndex(item => item.expenseCat === expenseCatName);
      if (foundIndex !== -1) {
        updatedExpenseCat.splice(foundIndex);
        updatedExpenseCat.forEach((item, newIndex) => {
          item.id = newIndex + 1;
        });
      }
      let newExpenseMonth = {};
      newExpenseMonth['month'] = selectedMonth;
      newExpenseMonth['expenses'] = updatedExpenseCat;
      console.log(newExpenseMonth);

      updateExpensesByMonth(selectedMonth,newExpenseMonth);
      setSelectedExpenses(updatedExpenseCat);
      setExpenseCatArray(updatedExpenseCat.map(expenseItems => expenseItems.expenseCat));
    }

    const deleteExpenseItem = (expenseName) => {
      let updatedExpenseItems = [
        ...expenseItems
      ];
      console.log(updatedExpenseItems);
      let foundIndex = updatedExpenseItems.findIndex(item => item.expense === expenseName);
      if (foundIndex !== -1) {
        updatedExpenseItems.splice(foundIndex);
        
      }

      let updatedExpenseCat = [
        ...expenses
      ];
      let foundSecondIndex = updatedExpenseCat.findIndex(item => item.expenseCat === expenseCat);
      console.log(`initial spent: ${updatedExpenseCat[foundSecondIndex].spent}`);
      console.log(`amount to be deleted: ${updatedExpenseCat[foundSecondIndex].expenseItems[foundIndex].spent}`);
      if (foundSecondIndex !== -1) {
        updatedExpenseCat[foundSecondIndex].spent = updatedExpenseCat[foundSecondIndex].spent - updatedExpenseCat[foundSecondIndex].expenseItems[foundIndex].spent;
        updatedExpenseCat[foundSecondIndex].expenseItems = updatedExpenseItems;
        console.log(`final spent: ${updatedExpenseCat[foundSecondIndex].spent}`);
        try {
          updatedExpenseCat[foundSecondIndex].date = updatedExpenseItems[-1].date;
        } catch(err) {
          updatedExpenseCat[foundSecondIndex].date = "";
          console.log(err);
        }
        setExpenseItems(()=>{
        
          const matchingExpense = updatedExpenseCat.find(expense => expense.expenseCat === expenseCat);
          console.log(matchingExpense.expenseItems);
          if (matchingExpense) {
            return matchingExpense.expenseItems;
          } else {
              return []; // Return an empty array if no match is found
          }
        })
      }

      let newExpenseMonth = {};
      newExpenseMonth['month'] = selectedMonth;
      newExpenseMonth['expenses'] = updatedExpenseCat;
      console.log(newExpenseMonth);

      updateExpensesByMonth(selectedMonth,newExpenseMonth);
      setSelectedExpenses(updatedExpenseCat);
    }

    if (!expenses || !Array.isArray(expenses)) {
        return <div>No expenses available</div>; // Handles invalid or missing data
      }
    
    

    return (
      <div className={styles.container}>
        {showExpenseTable && ( // Conditionally render the table
          <ul className={styles.responsiveTable}>
            <li className={styles.tableHeader}>
              <div className={styles.col1}>No</div>
              <div className={styles.col2}>Expense Cat</div>
              <div className={styles.col3}>Budget</div>
              <div className={styles.col4}>Spent</div>
              <div className={styles.col5}>Status</div>
              <div className={styles.col6}>Actions</div>
            </li>
            {expenses.map((expense, index) => (
              <li className={styles.tableRow} key={index} >
                <div className={styles.col1} data-label="No">{index + 1}</div>
                <div className={styles.col2} data-label="Expense Cat">{expense.expenseCat}</div>
                <div className={styles.col3} data-label="Budget">{expense.budget}</div>
                <div className={styles.col4} data-label="Spent">{expense.spent}</div>
                {/* <div className={styles.col5} data-label="Date">{expense.date}</div> */}
                <div className={styles.col5} data-label="progressBar">
                  <BorderLinearProgress variant="determinate" value={Math.min(100, (expense.spent / expense.budget) * 100)} />
                </div>
                <div className={styles.col6}> 
                <IconButton sx={{'&:hover': {backgroundColor: 'grey'}}} size="small" aria-label="view expense cart" onClick={()=>openExpense(expense.expenseCat)}>
                  <VisibilityIcon style={{ fill: 'black' }}/>
                </IconButton>
                <IconButton sx={{'&:hover': {backgroundColor: 'grey'}}} size="small" aria-label="edit expense cart" onClick={()=>handleClickUpdate(expense)}>
                  <EditIcon style={{ fill: 'black' }}/>
                </IconButton>
                <IconButton sx={{'&:hover': {backgroundColor: 'grey'}}} size="small" aria-label="delete expense cart" onClick={()=>deleteExpenseCatMth(expense.expenseCat)}>
                  <DeleteIcon style={{ fill: 'black' }}/>
                </IconButton>
                </div>
              </li>
            ))}
          </ul>
        )}
        {!showExpenseTable && ( // Conditionally render the table
          <ul className={styles.responsiveTable}>
            <li className={styles.tableHeader}>
              <div className={styles.col1}>No</div>
              <div className={styles.col2}>{expenseCat}</div>
              <div className={styles.col3}>Spent</div>
              <div className={styles.col4}>Date</div>
              <div className={styles.col5}>Actions</div>
            </li>
            { expenseItems.map((expenseItem, index) => (
              <li className={styles.tableRow} key={index} >
                <div className={styles.col1} data-label="No">{index + 1}</div>
                <div className={styles.col2} data-label="Expense Cat">{expenseItem.expense}</div>
                <div className={styles.col4} data-label="Spent">{expenseItem.spent}</div>
                <div className={styles.col5} data-label="Date">{expenseItem.date}</div>
                <div className={styles.col6}>
                  <IconButton sx={{'&:hover': {backgroundColor: 'grey'}}} size="small" aria-label="add to shopping cart" >
                    <EditIcon style={{ fill: 'black' }}/>
                  </IconButton>
                  <IconButton sx={{'&:hover': {backgroundColor: 'grey'}}} size="small" aria-label="add to shopping cart" onClick={()=>deleteExpenseItem(expenseItem.expense)}>
                    <DeleteIcon style={{ fill: 'black' }}/>
                  </IconButton>
                </div>
              </li>
            ))}
          </ul>
        )}

      </div>
        
    )

}

ExpenseTable.propTypes = {
    expenses: PropTypes.arrayOf(
      PropTypes.shape({
        expenseCat: PropTypes.string.isRequired,
        budget: PropTypes.number.isRequired,
        spent: PropTypes.number,
        date: PropTypes.string,
      })
    ).isRequired,
    selectedMonth: PropTypes.string.isRequired,
    setSelectedExpenses: PropTypes.func.isRequired,
    showExpenseTable: PropTypes.bool.isRequired,
    setShowExpenseTable: PropTypes.func.isRequired,
    expenseCatArray: PropTypes.array.isRequired,
    setExpenseCatArray: PropTypes.func.isRequired,
    handleClickUpdate: PropTypes.func.isRequired,
    setShowExpenseBtn: PropTypes.func.isRequired
  };