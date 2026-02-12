import { apiAuth } from "@/lib/api";
import { LoginPayload, RegisterPayload } from "./types";

export const csrf = () => apiAuth.get("/sanctum/csrf-cookie");

export const register = (payload: RegisterPayload) =>
  apiAuth.post("/api/register", payload);

export const login = (payload: LoginPayload) =>
  apiAuth.post("/api/login", payload);

export const logout = () => apiAuth.post("/api/logout");

export const getUser = () => apiAuth.get("/api/user");
