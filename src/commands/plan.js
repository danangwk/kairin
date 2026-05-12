const db = require('../services/database');
const { formatRupiah } = require('../utils/currency');

async function handlePlan(bot, chatId, user) {
  const limit = await db.checkLimit(user.id, 'text');

  const planInfo = {
    free:    { emoji: '🆓', name: 'Free',    next: 'Starter' },
    starter: { emoji: '⭐', name: 'Starter', next: 'Pro' },
    pro:     { emoji: '💎', name: 'Pro',     next: null },
    family:  { emoji: '👨‍👩‍👧', name: 'Family', next: null },
  };

  const info = planInfo[user.plan] || planInfo.free;

  let msg = `${info.emoji} *Plan Kamu: ${info.name}*\n\n`;
  msg += `📝 Teks: ${limit.current}/${limit.max === 999999 ? '∞' : limit.max} bulan ini\n`;

  const photoLimit = await db.checkLimit(user.id, 'photo');
  msg += `📷 Foto: ${photoLimit.current}/${photoLimit.max === 999999 ? '∞' : photoLimit.max} bulan ini\n`;

  if (info.next) {
    msg += `\n💡 Upgrade ke *${info.next}* untuk fitur lebih lengkap!\n`;
    msg += `Hubungi @KairinSupport untuk upgrade.`;
  }

  await bot.sendMessage(chatId, msg, { parse_mode: 'Markdown' });
}

module.exports = { handlePlan };