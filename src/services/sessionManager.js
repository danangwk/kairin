const processingUsers = {};
const userCooldown = {};
const ocrCache = {};

function isProcessing(userId) {
  return !!processingUsers[userId];
}

function setProcessing(userId, value = true) {
  if (value) {
    processingUsers[userId] = true;
  } else {
    delete processingUsers[userId];
  }
}

function isRateLimited(userId, limitMs = 1000) {
  const now = Date.now();
  const last = userCooldown[userId] || 0;

  if (now - last < limitMs) {
    return true;
  }

  userCooldown[userId] = now;
  return false;
}

function getOCRCache(fileId) {
  return ocrCache[fileId];
}

function setOCRCache(fileId, data) {
  ocrCache[fileId] = data;
}

module.exports = {
  isProcessing,
  setProcessing,
  isRateLimited,
  getOCRCache,
  setOCRCache
};