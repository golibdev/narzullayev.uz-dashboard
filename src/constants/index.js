export const baseUrl = "https://api.narzullayev.uz/api/v1/"
export const token = JSON.parse(localStorage.getItem('authx.user'))?.token;
export const headers = { headers: { Authorization: `Bearer ${token}` } }