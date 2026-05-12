const db = require('../services/database');
const { formatRupiah } = require('../utils/currency');

async function handleDompet(bot, chatId, user) {
  const wallets = await db.getUserWallets(user.id);

  if (wallets.length === 0) {
    await bot.sendMessage(chatId, '💼 Belum ada dompet. Ketik /start untuk setup!');
    return;
  }

  let total = 0;
  let msg = '💼 *Saldo Dompet Kamu*\n\n';

  wallets.forEach(w => {
    msg += `${w.icon} ${w.name}: Rp ${formatRupiah(w.balance)}\n`;
    total += w.balance;
  });

  msg += `\n*Total: Rp ${formatRupiah(total)}*`;

  await bot.sendMessage(chatId, msg, { parse_mode: 'Markdown' });
}

module.exports = { handleDompet };
