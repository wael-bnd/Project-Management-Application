import http from "./http-common";
import { IRegister } from "../interfaces/IRegister";
import { ILogin } from "../interfaces/ILogin";

export function login(loginData: ILogin) {
  console.log(loginData);
  return http.post("/signin", login);
}

export function register(userData: IRegister) {
  console.log(userData);
  return http.post("/signup", userData);
}
