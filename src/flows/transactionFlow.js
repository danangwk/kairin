const transactionRepo = require('../services/db/transactionRepo');
const ai = require('../services/claude');
const { parseOfflineTransaction } = require('../utils/parser');

async function handleTextTransaction(bot, chatId, user, text) {

  // 🔥 1. COBA OFFLINE DULU (NO API)
  let parsed = parseOfflineTransaction(text);

  // 🔥 2. KALAU GAGAL BARU AI
  if (!parsed) {
    parsed = await ai.parseTransactionText(text);
  }

  console.log('🧠 PARSED TEXT:', parsed);

 // 🔥 3. VALIDATION (SATU TEMPAT)
  if (!parsed) {
    return false; // fallback ke AI chat
  }

  if (!parsed.amount || parsed.amount <= 0) {
    await bot.sendMessage(chatId, '❌ Nominal tidak valid');
    return false;
  }

  if (!parsed.description) {
    await bot.sendMessage(chatId, '❌ Deskripsi tidak terbaca');
    return false;
  }

  // 🔥 optional confidence (kalau pakai AI)
  if (parsed.confidence && parsed.confidence < 0.5) {
    return false;
  }

  console.log('💾 SAVE TEXT:', {
    user: user.id,
    amount: parsed.amount,
    desc: parsed.description,
    category: parsed.category,
    type: parsed.type
  });

  const trx = await transactionRepo.saveTransaction(user.id, {
    type: parsed.type,
    amount: parsed.amount,
    description: parsed.description,
    category: parsed.category,
    source: 'text',
    transactedAt: new Date().toISOString()
  });

  await bot.sendMessage(chatId,
    `${parsed.type === 'pemasukan' ? '🟢' : '🔴'} *${parsed.type.toUpperCase()}*\n\n` +
    `📝 ${parsed.description}\n` +
    `💵 Rp ${parsed.amount.toLocaleString('id-ID')}\n` +
    `📂 ${parsed.category}`
  , { parse_mode: 'Markdown' });

  return true;
}

module.exports = { handleTextTransaction };