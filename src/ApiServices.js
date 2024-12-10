import axios from "axios";

const apiService = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

const admin_get_data = (endpoint, loggedData) => {
    console.log("manish ==========",loggedData);
    console.log("manish ==========",loggedData.auth_key);
    console.log("manish ==========",loggedData.access_token);
  return apiService.post(endpoint, {   //get -> post
    headers: {
    //   "Content-Type": "application/json",
      "X-Auth-Key":`${loggedData.auth_key}`,
      "X-Access-Token":`${loggedData.access_token}`,
    },
  });
};

const admin_post_data = (endpoint, data, loggedData) => {
  return apiService.post(endpoint, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${loggedData.token}`,
    },
  });
};
const admin_post_formData = (endpoint, formData, loggedData) => {
  return apiService.post(endpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${loggedData.token}`,
    },
  });
};

const user_get_data = (endpoint) => {
  return apiService.get(endpoint, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
const user_post_data = (endpoint, data) => {
  return apiService.post(endpoint, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
const user_post_formData = (endpoint, formData) => {
  return apiService.post(endpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const user_post_imgs = (endpoint, formData, loggedData) => {
  return apiService.post(endpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${loggedData.token}`,
    },
  });
};

const _post_data = (endpoint,data) => {
  return apiService.post(endpoint, data, {   
      headers: {
          "Content-Type": "application/json"
      }
  });
};

export {
  admin_get_data,
  admin_post_data,
  admin_post_formData,
  user_get_data,
  user_post_data,
  user_post_formData,
  user_post_imgs,
  _post_data
};