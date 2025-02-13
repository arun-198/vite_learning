import styles from "./ExpenseTable.module.css"
import PropTypes from "prop-types";
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {updateExpensesByMonth} from '../services/ExpenseApi';

export default function ExpenseTable({ expenses,selectedMonth,setSelectedExpenses, showExpenseTable, setShowExpenseTable, expenseCatArray, setExpenseCatArray, setShowExpenseBtn }) {

  //let ExpenseCatList = ['Travel','Food'];
  const [expenseCat, setExpenseCat] = React.useState(expenseCatArray[0]); 
  const [expenseItems, setExpenseItems] = React.useState([]);


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
      if (foundSecondIndex !== -1) {
        updatedExpenseCat[foundSecondIndex].expenseItems = updatedExpenseItems;
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
              <div className={styles.col5}>Date</div>
              <div className={styles.col6}> </div>
            </li>
            {expenses.map((expense, index) => (
              <li className={styles.tableRow} key={index} >
                <div className={styles.col1} data-label="No">{index + 1}</div>
                <div className={styles.col2} data-label="Expense Cat">{expense.expenseCat}</div>
                <div className={styles.col3} data-label="Budget">{expense.budget || "N/A"}</div>
                <div className={styles.col4} data-label="Spent">{expense.spent}</div>
                <div className={styles.col5} data-label="Date">{expense.date}</div>
                <div className={styles.col6}> 
                <IconButton size="small" aria-label="add to shopping cart" onClick={()=>openExpense(expense.expenseCat)}>
                  <VisibilityIcon style={{ fill: 'black' }}/>
                </IconButton>
                <IconButton size="small" aria-label="add to shopping cart" >
                  <EditIcon style={{ fill: 'black' }}/>
                </IconButton>
                <IconButton size="small" aria-label="add to shopping cart" onClick={()=>deleteExpenseCatMth(expense.expenseCat)}>
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
                  <IconButton size="small" aria-label="add to shopping cart" >
                    <EditIcon style={{ fill: 'black' }}/>
                  </IconButton>
                  <IconButton size="small" aria-label="add to shopping cart" onClick={()=>deleteExpenseItem(expenseItem.expense)}>
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
    setShowExpenseBtn: PropTypes.func.isRequired
  };