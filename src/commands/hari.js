const db = require('../services/database');
const { formatRupiah } = require('../utils/currency');

async function handleHari(bot, chatId, user) {
  const transactions = await db.getTodayTransactions(user.id);

  if (transactions.length === 0) {
    await bot.sendMessage(chatId,
      '📋 Belum ada transaksi hari ini.\n\nYuk mulai catat! 💪'
    );
    return;
  }

  let total = 0;
  let msg = '📋 *Transaksi Hari Ini*\n\n';

  transactions.forEach(t => {
    const sign = t.type === 'pemasukan' ? '🟢 +' : '🔴 -';
    msg += `${sign}Rp ${formatRupiah(t.amount)} — ${t.description}\n`;
    total += t.type === 'pemasukan' ? t.amount : -t.amount;
  });

  msg += `\n*Saldo hari ini: ${total >= 0 ? '+' : ''}Rp ${formatRupiah(total)}*`;

  await bot.sendMessage(chatId, msg, { parse_mode: 'Markdown' });
}

module.exports = { handleHari };