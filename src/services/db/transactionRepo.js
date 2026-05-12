const db = require('../database');

// SIMPAN TRANSAKSI
async function saveTransaction(userId, data) {
  return db.saveTransaction(userId, data);
}

// AMBIL SEMUA
async function getAllTransactions(userId) {
  return db.getAllTransactions(userId);
}

// SUMMARY
async function getMonthlySummary(userId) {
  return db.getMonthlySummary(userId);
}

module.exports = {
  saveTransaction,
  getAllTransactions,
  getMonthlySummary
};