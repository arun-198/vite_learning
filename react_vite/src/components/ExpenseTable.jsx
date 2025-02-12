import styles from "./ExpenseTable.module.css"
import PropTypes from "prop-types";
import * as React from 'react';


export default function ExpenseTable({ expenses, showExpenseTable, setShowExpenseTable, expenseCatArray, setShowExpenseBtn }) {

  //let ExpenseCatList = ['Travel','Food'];
  const [expenseCat, setExpenseCat] = React.useState(expenseCatArray[0]); 
  const [expenseItems, setExpenseItems] = React.useState([]);


    const openExpense = ( expenseCat ) => {
      console.log(`Expense selected: ${expenseCat}`);
      //console.log(`Expense Items: ${expenseItems}`)
      setShowExpenseTable(false);
      setExpenseCat(expenseCat);
      setExpenseItems(()=>{
        
        const matchingExpense = expenses.find(expense => expense.expenseCat === expenseCat);
        console.log(matchingExpense);
        if (matchingExpense) {
          return matchingExpense.expenseItems;
        } else {
            return []; // Return an empty array if no match is found
        }
      })
      setShowExpenseBtn(true);
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
              <li className={styles.tableRow} key={index} onClick={()=>openExpense(expense.expenseCat)}>
                <div className={styles.col1} data-label="No">{index + 1}</div>
                <div className={styles.col2} data-label="Expense Cat">{expense.expenseCat}</div>
                <div className={styles.col3} data-label="Budget">{expense.budget || "N/A"}</div>
                <div className={styles.col4} data-label="Spent">{expense.spent}</div>
                <div className={styles.col5} data-label="Date">{expense.date}</div>
                <div className={styles.col6}> </div>
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
            {!expenseItems && expenseItems.map((expenseItem, index) => (
              <li className={styles.tableRow} key={index} >
                <div className={styles.col1} data-label="No">{index + 1}</div>
                <div className={styles.col2} data-label="Expense Cat">{expenseItem.expense}</div>
                <div className={styles.col4} data-label="Spent">{expenseItem.spent}</div>
                <div className={styles.col5} data-label="Date">{expenseItem.date}</div>
                <div className={styles.col6}> </div>
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
    showExpenseTable: PropTypes.bool.isRequired,
    setShowExpenseTable: PropTypes.func.isRequired,
    expenseCatArray: PropTypes.array.isRequired,
    setShowExpenseBtn: PropTypes.func.isRequired
  };