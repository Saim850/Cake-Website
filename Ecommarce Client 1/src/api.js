import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

api.interceptors.request.use((configs) => {
  const access = localStorage.getItem("access")

  if (access) {
    configs.headers.Authorization = `Bearer ${access}`
  }

  return configs;
})

const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");

  window.location.href = "/login";
};

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh")

      if (!refresh) {
        logout();
        return Promise.reject(error);
      }

      try {
        const res = await api.post(
          "/auth/jwt/refresh/",
          {
            refresh,
          }
        );

        const newAccess = res.data.access;

        localStorage.setItem("access", newAccess);

        originalRequest.headers.Authorization =
          `Bearer ${newAccess}`;

        return api(originalRequest);

      } catch (refreshError) {

        // Refresh token expired
        logout();

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;