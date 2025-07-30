// src/services/httpService.js
import api from "./api";

/**
 * Gửi request linh hoạt (GET, POST, PUT, DELETE, PATCH)
 * @param {"get"|"post"|"put"|"delete"|"patch"} method
 * @param {string} url
 * @param {any} data - payload (optional)
 * @param {object} config - custom headers, params... (optional)
 * @returns {Promise<any>}
 */
export const httpRequest = async (method, url, data = null, config = {}) => {
  const isFormData = data instanceof FormData;

  const headers = {
    ...(isFormData ? { "Content-Type": "multipart/form-data" } : {}),
    ...config.headers,
  };

  const finalConfig = {
    ...config,
    headers,
  };

  try {
    const response = await api.request({
      method,
      url,
      data,
      ...finalConfig,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

// Shortcut cho từng method

export const httpGet = (url, config = {}) =>
  httpRequest("get", url, null, config);

export const httpPost = (url, data, config = {}) =>
  httpRequest("post", url, data, config);

export const httpPut = (url, data, config = {}) =>
  httpRequest("put", url, data, config);

export const httpDelete = (url, config = {}) =>
  httpRequest("delete", url, null, config);

export const httpPatch = (url, data, config = {}) =>
  httpRequest("patch", url, data, config);
