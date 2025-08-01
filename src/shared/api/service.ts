import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const BASE_URL = "http://localhost:8080";

export const loanApi = createApi({
  reducerPath: "loanApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  }),
  endpoints: (build) => ({}),
});
