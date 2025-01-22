import styles from "./ExpenseTable.module.css"
import PropTypes from "prop-types";

export default function ExpenseTable({ expenses }) {

    const openExpense = () => {
      console.log("Expense selected");
    }

    if (!expenses || !Array.isArray(expenses)) {
        return <div>No expenses available</div>; // Handles invalid or missing data
      }
    

    return (
        <div className={styles.container}>
   
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
                <li className={styles.tableRow} key={index} onClick={openExpense}>
                    <div className={styles.col1} data-label="No">{index + 1}</div>
                    <div className={styles.col2} data-label="Expense Cat" >{expense.expenseCat}</div>
                    <div className={styles.col3} data-label="Budget">{expense.budget || "N/A"}</div>
                    <div className={styles.col4} data-label="Spent">{expense.spent}</div>
                    <div className={styles.col5} data-label="Date">{expense.date}</div>
                    <div className={styles.col6} ></div>
                </li>
                ))}
            </ul>
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
  };