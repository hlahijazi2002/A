const axios = require("axios");
require("dotenv").config();

const carbonApi = axios.create({
  baseURL: process.env.CARBON_API_URL,
  headers: {
    "x-admin-api-key": process.env.CARBON_API_KEY,
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Log errors
carbonApi.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("Carbon API error:", err.response?.data || err.message);
    return Promise.reject(err);
  },
);

module.exports = carbonApi;
