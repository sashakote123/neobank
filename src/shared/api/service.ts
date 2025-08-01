import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IOfferItem, ITransformedData } from "../types/types";
import { updateArray, updateCurrentOffer } from "@/src/app/store/offersSlice";

const BASE_URL = "http://localhost:8080";

export const loanApi = createApi({
  reducerPath: "loanApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  }),
  //   tagTypes: ['loan'],
  endpoints: (build) => ({
    fetchLoanStatus: build.query({
      query: (applicationId: string | undefined) => ({
        url: `/admin/application/${applicationId}`,
      }),
    }),
    createLoanApplication: build.mutation<IOfferItem[], ITransformedData>({
      query: (data: any) => ({
        url: "/application",
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const data = await queryFulfilled;
          dispatch(updateArray(data.data));
          localStorage.setItem("currentAppArray", JSON.stringify(data.data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    chooseOffer: build.mutation({
      query: (offer) => ({
        url: "/application/apply",
        method: "POST",
        body: { ...offer },
      }),
      onQueryStarted: async (offer, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          localStorage.setItem("currentOffer", JSON.stringify(offer));
          dispatch(updateCurrentOffer(offer));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    sendEmployerInfo: build.mutation({
      query: ({ data, applicationId }) => ({
        url: `/application/registration/${applicationId}`,
        method: "PUT",
        body: { ...data },
      }),
    }),
    applySchedule: build.mutation({
      query: ({ applicationId }) => ({
        url: `/document/${applicationId}`,
        method: "POST",
      }),
    }),

    signDocument: build.mutation({
      query: ({ applicationId }) => ({
        url: `/document/${applicationId}/sign`,
        method: "POST",
      }),
    }),

    enterCode: build.mutation({
      query: ({
        data,
        applicationId,
      }: {
        data: string[];
        applicationId: string | undefined;
      }) => ({
        url: `/document/${applicationId}/sign/code`,
        method: "POST",
        body: JSON.stringify(data.join("")),
      }),
    }),
  }),
});
