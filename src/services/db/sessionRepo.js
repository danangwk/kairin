const db = require('../database');

// ===== OCR SESSION =====

async function createOcrSession(userId, data) {
  // simpan ke memory sementara (simple fix dulu)
  global.ocrSessions = global.ocrSessions || {};
  global.ocrSessions[userId] = data;
}

async function getOcrSession(userId) {
  return global.ocrSessions?.[userId] || null;
}

async function deleteOcrSession(userId) {
  if (global.ocrSessions) {
    delete global.ocrSessions[userId];
  }
}

// ===== EDIT SESSION =====

async function createEditSession(userId, data) {
  return db.createEditSession(userId, data);
}

async function getEditSession(userId) {
  return db.getEditSession(userId);
}

async function deleteEditSession(userId) {
  return db.deleteEditSession(userId);
}

module.exports = {
  createOcrSession,
  getOcrSession,
  deleteOcrSession,
  createEditSession,
  getEditSession,
  deleteEditSession
};