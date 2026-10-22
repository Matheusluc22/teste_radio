/* ==========================================================================
   UNIFIT API CLIENT SERVICE - v4.0
   Cliente HTTP reutilizável para comunicação com a API REST Node.js / Express.
   ========================================================================== */

window.UniFitAPI = {
  baseURL: window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" 
    ? "http://localhost:5000/api"
    : "/api",

  getToken() {
    return window.UniFitStorage ? window.UniFitStorage.get("unifit_jwt_token", null) : null;
  },

  setToken(token) {
    if (window.UniFitStorage) {
      window.UniFitStorage.set("unifit_jwt_token", token);
    }
  },

  clearToken() {
    if (window.UniFitStorage) {
      window.UniFitStorage.remove("unifit_jwt_token");
    }
  },

  async request(endpoint, options = {}) {
    const token = this.getToken();
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    };

    const config = {
      ...options,
      headers
    };

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Erro HTTP ${response.status}`);
      }

      return { success: true, data };
    } catch (error) {
      console.warn(`[UniFitAPI] Erro na requisição ${endpoint}:`, error.message);
      return { success: false, error: error.message };
    }
  },

  get(endpoint) {
    return this.request(endpoint, { method: "GET" });
  },

  post(endpoint, body) {
    return this.request(endpoint, { method: "POST", body: JSON.stringify(body) });
  },

  put(endpoint, body) {
    return this.request(endpoint, { method: "PUT", body: JSON.stringify(body) });
  },

  delete(endpoint) {
    return this.request(endpoint, { method: "DELETE" });
  }
};
