import styles from "./ExpenseTable.module.css"
import PropTypes from "prop-types";

export default function ExpenseTable({ expenses }) {

    if (!expenses || !Array.isArray(expenses)) {
        return <div>No expenses available</div>; // Handles invalid or missing data
      }
    

    return (
        <div className={styles.container}>
            <h2>
                
            </h2>
            <ul className={styles.responsiveTable}>
                <li className={styles.tableHeader}>
                <div className={styles.col1}>No</div>
                <div className={styles.col2}>Expense Type</div>
                <div className={styles.col3}>Cat</div>
                <div className={styles.col4}> Amount</div>
                <div className={styles.col5}> Date</div>
                <div className={styles.col6}> </div>
                </li>
                {expenses.map((expense, index) => (
                <li className={styles.tableRow} key={index}>
                    <div className={styles.col1} data-label="No">{index + 1}</div>
                    <div className={styles.col2} data-label="Expense Type">{expense.expenseType}</div>
                    <div className={styles.col3} data-label="Category">{expense.cat || "N/A"}</div>
                    <div className={styles.col4} data-label="Amount">{expense.amount}</div>
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
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.string,
        amount: PropTypes.string.isRequired,
      })
    ).isRequired,
  };