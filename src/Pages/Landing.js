import React from 'react';

export const Landing = () => {
    const [monthlyExpenses, setMonthlyExpenses] = React.useState([{ id: 1, label: '', value: '' }]);

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
                        onChange={e => handleExpenseChange(expense.id, e.target.value)}
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
                <button type="submit" className="btn btn-primary">
                    Generate Report
                </button>
                </div>
            </div>
            </form>
        </div>
        </body>
    );
};

export default Landing;
