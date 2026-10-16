const BASE_URL = import.meta.env.VITE_API_URL || 'https://majesty-backend-inux.onrender.com/api';

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

// Works for data URLs (new), full URLs, and old '/uploads/...' paths
export const avatarSrc = (a) => {
  if (!a) return null;
  if (a.startsWith('data:') || a.startsWith('http')) return a;
  return `${BASE_URL.replace(/\/api\/?$/, '')}${a}`;
};

// Shrink photo to max 256px JPEG so uploads are small and fast on mobile data
const shrinkImage = (file, max = 256) =>
  new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      canvas.toBlob((b) => resolve(b ? new File([b], 'avatar.jpg', { type: 'image/jpeg' }) : file), 'image/jpeg', 0.85);
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(file); };
    img.src = url;
  });

export const uploadAvatar = async (original) => {
  const file = await shrinkImage(original);
  const formData = new FormData();
  formData.append('avatar', file);
  return fetch(`${BASE_URL}/auth/avatar`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${getToken()}` },
    body: formData,
  }).then(r => r.json());
};