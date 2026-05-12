function info(...args) {
  console.log('ℹ️', ...args);
}

function error(...args) {
  console.error('❌', ...args);
}

function success(...args) {
  console.log('✅', ...args);
}

function ocr(...args) {
  console.log('🖼️', ...args);
}

module.exports = {
  info,
  error,
  success,
  ocr
};