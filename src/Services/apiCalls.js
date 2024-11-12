import axios from "axios";
// const baseURL = "https://alalamya.onrender.com/api/v1/";
const baseURL = "https://alamia-1vfdgf2n.b4a.run/api/v1/";


export const postData = async (url, data, token) => {
  let result = [];
  await axios
    .post(baseURL + url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      result = response.data;
    })
    .catch((error) => {
      result = error;
    });
  return result;
};

export const getData = async (url, token) => {
  let result = [];
  await axios
    .get(baseURL + url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      result = response.data;
    })
    .catch((error) => {
      result = error;
    });
  return result;
};

export const putData = async (url, data, token) => {
  let result = [];
  await axios
    .put(baseURL + url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      result = response.data;
    })
    .catch((error) => {
      result = error;
    });
  return result;
};

export const deleteData = async (url, token) => {
  let result = [];
  await axios
    .delete(baseURL + url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      result = response.data;
    })
    .catch((error) => {
      result = error;
    });
  return result;
};
