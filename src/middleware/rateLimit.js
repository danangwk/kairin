const { isRateLimited } = require('../services/sessionManager');

async function rateLimit(userId, bot, chatId) {

  if (!isRateLimited(userId, 800)) {
    return false;
  }

  await bot.sendMessage(
    chatId,
    '⏳ Terlalu cepat, tunggu sebentar ya'
  );

  return true;
}

module.exports = {
  rateLimit
};