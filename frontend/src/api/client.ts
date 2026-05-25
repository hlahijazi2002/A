const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const getToken = () => localStorage.getItem("token");

export const api = {
  get: async (path: string) => {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(getToken() && { Authorization: `Bearer ${getToken()}` }),
      },
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
  },

  post: async (path: string, body: unknown) => {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(getToken() && { Authorization: `Bearer ${getToken()}` }),
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
  },

  patch: async (path: string, body: unknown) => {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(getToken() && { Authorization: `Bearer ${getToken()}` }),
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
  },
};
