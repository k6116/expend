
const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize').sequelize;

const User = require('./user');
const Category = require('./category');

const Expense = sequelize.define('expense',
  {
    id: { type: Sequelize.INTEGER, field: 'ID', primaryKey: true, autoIncrement: true },
    date: { type: Sequelize.DATE, field: 'Date' },
    amount: { type: Sequelize.NUMERIC, field: 'Amount' },
    description: { type: Sequelize.STRING, field: 'Description' },
    categoryId: { type: Sequelize.INTEGER, field: 'CategoryID' },
    purchasedBy: { type: Sequelize.INTEGER, field: 'PurchasedBy' },
    shared: { type: Sequelize.BOOLEAN, field: 'Shared' },
    reimbursed: { type: Sequelize.BOOLEAN, field: 'Reimbursed' },
    notes: { type: Sequelize.STRING, field: 'Notes' },
    createdBy: { type: Sequelize.INTEGER, field: 'CreatedBy' },
    creationDate: { type: Sequelize.DATE, field: 'CreationDate' },
  },
  {
    schema: 'public',
    tableName: 'Expense',
    timestamps: false
  }
);

User.hasMany(Expense, {as: 'purchasedByUser', foreignKey: 'id'});
Expense.belongsTo(User, {as: 'purchasedByUser', foreignKey: 'purchasedBy'});

User.hasMany(Expense, {as: 'createdByUser', foreignKey: 'id'});
Expense.belongsTo(User, {as: 'createdByUser', foreignKey: 'createdBy'});

Category.hasMany(Expense, {foreignKey: 'id'});
Expense.belongsTo(Category, {foreignKey: 'categoryId'});

module.exports = Expense
