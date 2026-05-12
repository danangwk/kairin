const userCooldown = {};

function isRateLimited(userId, limitMs = 1000) {
  const now = Date.now();
  const last = userCooldown[userId] || 0;

  if (now - last < limitMs) {
    return true;
  }

  userCooldown[userId] = now;
  return false;
}

module.exports = { isRateLimited };