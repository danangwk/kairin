async function handleHelp(bot, chatId) {
  const msg = `📖 *Panduan Kairin*

*Input Transaksi Teks:*
\`makan siang 25000\` → pengeluaran
\`bensin 80rb\` → pengeluaran
\`+gaji 5jt\` → pemasukan
\`+transfer masuk 500000\` → pemasukan

*Foto Struk:*
Kirim foto struk/bill langsung → Kairin baca otomatis!

*Perintah:*
/edit — Ubah detai transaksi tersimpan
/hapus — Hapus transaksi terimpan
/saldo — Rekap bulan ini
/hari — Transaksi hari ini
/dompet — Saldo semua dompet
/plan — Info & upgrade plan
/help — Panduan ini

*Tanya AI (Plan Pro):*
Ketik pertanyaan bebas tentang keuangan kamu!
Contoh: _"Bulan ini saya boros di mana?"_`;

  await bot.sendMessage(chatId, msg, { parse_mode: 'Markdown' });
}

module.exports = { handleHelp };