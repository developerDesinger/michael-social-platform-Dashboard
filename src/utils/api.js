// API Configuration
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Get token from localStorage
const getToken = () => localStorage.getItem("token");

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || "An error occurred");
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

// API client
class ApiClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const token = getToken();
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (token && !options.skipAuth) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const config = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      return await handleResponse(response);
    } catch (error) {
      if (error.status === 401) {
        // Token expired or invalid
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
      throw error;
    }
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: "GET" });
  }

  post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: "DELETE" });
  }
}

// Export singleton instance
export const api = new ApiClient();

// Auth API
export const authAPI = {
  login: (credentials) =>
    api.post("/auth/login", credentials, { skipAuth: true }),
  logout: () => api.post("/auth/logout"),
  getMe: () => api.get("/auth/me"),
  validateToken: () => api.get("/auth/validate"),
};

// Users API
export const usersAPI = {
  getAll: (params) => {
    const queryString = new URLSearchParams(params).toString();
    return api.get(`/users${queryString ? `?${queryString}` : ""}`);
  },
  getById: (id) => api.get(`/users/${id}`),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
};

export default api;
