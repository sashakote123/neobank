import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const loanApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createLoanApplication = async (data: any) => {
  const resp = await loanApi.post("/application", { ...data });
  localStorage.setItem("currentAppArray", JSON.stringify(resp.data));
  return resp;
};

export const chooseOffer = async (data: any) => {
  await loanApi.post("/application/apply", { ...data });
  localStorage.setItem("currentOffer", JSON.stringify({ ...data }));
};

export const sendEmployerInfo = async (data: any, id: string | undefined) => {
  await loanApi.put(`/application/registration/${id}`, JSON.stringify(data));
};

export const applySchedule = async (id: string | undefined) => {
  await loanApi.post(`/document/${id}`);
};

export const signDocument = async (id: string | undefined) => {
  await loanApi.post(`/document/${id}/sign`);
};

export const enterCode = async (data: string[], id: string | undefined) => {
  const resp = await loanApi.post(
    `/document/${id}/sign/code`,
    JSON.stringify(data.join(""))
  );
  return resp;
};
