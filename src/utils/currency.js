function formatRupiah(amount) {
  return Math.round(amount).toLocaleString('id-ID');
}

module.exports = { formatRupiah };