function logEvent(type, data = {}) {

  console.log('📊 EVENT:', {
    type,
    timestamp: new Date().toISOString(),
    ...data
  });

}

module.exports = {
  logEvent
};