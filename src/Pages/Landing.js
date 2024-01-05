import React from 'react';

export const Landing = () => {
    const [monthlyExpenses, setMonthlyExpenses] = React.useState([{ id: 1, label: '', value: '' }]);
    const [yearlyIncome, setYearlyIncome] = React.useState(0);
    const [reportData, setReportData] = React.useState(null);


    const handleAddExpense = () => {
        const newExpense = {
          id: monthlyExpenses.length + 1,
          label: '',
          value: '',
        };
        setMonthlyExpenses([...monthlyExpenses, newExpense]);
    };

    const handleExpenseChange = (id, field, value) => {
        const updatedExpenses = monthlyExpenses.map(expense =>
          expense.id === id ? { ...expense, [field]: value } : expense
        );
        setMonthlyExpenses(updatedExpenses);
    };

    const handleRemoveExpense = id => {
        const updatedExpenses = monthlyExpenses.filter(expense => expense.id !== id);
        setMonthlyExpenses(updatedExpenses);
    };

    const handleGenerateReport = (e) => {
        e.preventDefault();
        const totalExpenses = monthlyExpenses.reduce((acc, expense) => acc + parseFloat(expense.value || 0), 0);
        const percentageSpent = (totalExpenses / (yearlyIncome/12)) * 100;

        const expenseBreakdown = monthlyExpenses.map((expense) => ({
            label: expense.label, 
            value: (parseFloat(expense.value) / yearlyIncome) * 100,
        }));

        const report = {
            totalExpenses, 
            percentageSpent, 
            expenseBreakdown, 
        };

        setReportData(report);
    }

    const handleYearlyIncomeChange = (value) => {
        setYearlyIncome(value);
    }

    return (
        <body className="container-fluid h-100 mt-4">
        <div className="row h-100 justify-content-center align-items-center">
            <form className="col-sm-6">
            <div className="form-group row mb-3">
                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                Yearly Income
                </label>
                <div className="col-sm-10">
                <input
                    type="number"
                    className="form-control"
                    id="inputEmail3"
                    placeholder="Yearly Income"
                    min="0"
                    value={yearlyIncome}
                    onChange ={(e) => handleYearlyIncomeChange(e.target.value)}
                />
                </div>
            </div>
            <div className="form-group row mb-3">
                <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                Name
                </label>
                <div className="col-sm-10">
                <input
                    type="text"
                    className="form-control"
                    id="inputPassword3"
                    placeholder="Name"
                />
                </div>
            </div>
            <div className="form-group row mb-3">
                <label className="col-sm-2 col-form-label">Monthly Expenses</label>
                <div className="col-sm-10">
                {monthlyExpenses.map(expense => (
                    <div key={expense.id} className="mb-2 d-flex">
                    <input
                    type="text"
                    className="form-control mr-2 mb-2"
                    placeholder={`Enter label for monthly expense #${expense.id}`}
                    value={expense.label}
                    onChange={e => handleExpenseChange(expense.id, 'label', e.target.value)}
                    />
                    <input
                        type="number"
                        className="form-control mr-2 mb-2"
                        placeholder={`Enter monthly expense #${expense.id}`}
                        min="0"
                        value={expense.value}
                        onChange={e => handleExpenseChange(expense.id, 'value', e.target.value)}
                    />
                    <button
                        type="button"
                        className="btn btn-danger btn-sm mb-2"
                        onClick={() => handleRemoveExpense(expense.id)}
                    >
                        Remove
                    </button>
                    </div>
                ))}
                <button type="button" className="btn btn-secondary" onClick={handleAddExpense}>
                    Add Monthly Expense
                </button>
                </div>
            </div>
            <div className="form-group row mb-3">
                <div className="col-sm-10">
                <button type="submit" className="btn btn-primary" onClick={(e) => handleGenerateReport(e)}>
                    Generate Report
                </button>
                </div>
            </div>
            </form>
            {reportData && (
                <div className="mx-auto mt-4 text-center">
                    <div style={{ textAlign: 'left', display: 'inline-block', border: '1px solid #ddd', padding: '15px', height: '80%', width: '80%', overflowY: 'auto' }}>
                        <h2>Report</h2>
                        <p>Total Monthly Expenses: ${reportData.totalExpenses.toFixed(2)}</p>
                        <p>Percentage of Monthly Income Spent: {reportData.percentageSpent.toFixed(2)}%</p>

                        <h3>Expense Breakdown:</h3>
                        <ul>
                            {reportData.expenseBreakdown.map((expense, index) => (
                                <li key={index}>
                                    {expense.label}: {expense.value.toFixed(2)}%
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
        </body>
    );
};

export default Landing;
