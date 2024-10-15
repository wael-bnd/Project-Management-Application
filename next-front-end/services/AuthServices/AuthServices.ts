import http from "./http-common";
import { IRegister } from "../interfaces/IRegister";
import { ILogin } from "../interfaces/ILogin";

export function login(loginData: ILogin) {
  return http.post("/signin", loginData);
}

export function register(userData: IRegister) {
  return http.post("/signup", userData);
}
