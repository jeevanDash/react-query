import axios from "axios";

const PRD_API = "https://api.escuelajs.co/api/v1";
const client = axios.create({ baseURL: "http://localhost:4000" });

export const request = ({ ...options }) => {
  const onSuccess = (responnse) => responnse;
  const onError = (error) => error;

  return client(options).then(onSuccess).catch(onError);
};
