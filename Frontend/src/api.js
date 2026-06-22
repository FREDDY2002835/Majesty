const BASE_URL = 'http://localhost:5000/api';

// Helper: get token from localStorage
const getToken = () => localStorage.getItem('token');

// Helper: build headers
const headers = (auth = false) => ({
  'Content-Type': 'application/json',
  ...(auth && { Authorization: `Bearer ${getToken()}` }),
});

// ── Auth ──────────────────────────────────────────
export const signup = (name, email, password) =>
  fetch(`${BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ name, email, password }),
  }).then(r => r.json());

export const login = (email, password) =>
  fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ email, password }),
  }).then(r => r.json());

export const getMe = () =>
  fetch(`${BASE_URL}/auth/me`, {
    headers: headers(true),
  }).then(r => r.json());

export const updateMe = (data) =>
  fetch(`${BASE_URL}/auth/me`, {
    method: 'PUT',
    headers: headers(true),
    body: JSON.stringify(data),
  }).then(r => r.json());

// ── Translation ───────────────────────────────────
export const translate = (text, source_language, target_language) =>
  fetch(`${BASE_URL}/translate`, {
    method: 'POST',
    headers: headers(true),
    body: JSON.stringify({ text, source_language, target_language }),
  }).then(r => r.json());
  
// ── History ───────────────────────────────────────
export const getHistory = () =>
  fetch(`${BASE_URL}/translate/history`, {
    headers: headers(true),
  }).then(r => r.json());

export const deleteHistoryItem = (id) =>
  fetch(`${BASE_URL}/translate/history/${id}`, {
    method: 'DELETE',
    headers: headers(true),
  }).then(r => r.json());

export const clearHistory = () =>
  fetch(`${BASE_URL}/translate/history`, {
    method: 'DELETE',
    headers: headers(true),
  }).then(r => r.json());

  export const detectLanguage = (text) =>
  fetch(`${BASE_URL}/translate/detect`, {
    method: 'POST',
    headers: headers(true),
    body: JSON.stringify({ text }),
  }).then(r => r.json());

  export const getSupportedLanguages = () =>
  fetch(`${BASE_URL}/translate/languages`)
    .then(r => r.json());