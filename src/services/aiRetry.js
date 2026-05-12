async function withRetry(fn, options = {}) {
  const {
    retries = 1,
    delay = 1500
  } = options;

  let lastError;

  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;

      console.log(`⚠️ Retry ${i + 1} gagal:`, err.message);

       // 🔥 STOP kalau quota habis
      if (err.message.includes('429')) {
        console.log('❌ Quota habis, stop retry');
        break;
      }

      if (i < retries) {
        await new Promise(res => setTimeout(res, delay));
      }
    }
  }

  console.log('❌ Semua retry gagal');
  return null;
}

module.exports = { withRetry };