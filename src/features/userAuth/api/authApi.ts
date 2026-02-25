import { baseApi } from "../../../shared/api/baseApi";
import type { LoginResponse, LoginRequest } from "./types.ts";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<LoginResponse, LoginRequest>({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
    }),

    getUser: builder.query<
      Omit<LoginResponse, "accessToken" | "refreshToken">,
      void
    >({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginUserMutation, useGetUserQuery } = authApi;
