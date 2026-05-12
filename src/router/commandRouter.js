const { handleHelp } = require('../commands/help');
const { handlePlan } = require('../commands/plan');
const { handleHari } = require('../commands/hari');
const { handleDompet } = require('../commands/dompet');
const { handleSaldo } = require('../commands/saldo');
const { handleStart } = require('../commands/start');

const commands = {
  '/start': handleStart,
  '/help': handleHelp,
  '/plan': handlePlan,
  '/hari': handleHari,
  '/dompet': handleDompet,
  '/saldo': handleSaldo
};

async function routeCommand(bot, chatId, user, input) {
  const handler = commands[input];

  if (!handler) {
    return false;
  }

  await handler(bot, chatId, user);

return true;
}

module.exports = {
  routeCommand
};