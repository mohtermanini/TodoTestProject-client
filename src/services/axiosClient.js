import axios from "axios";
import { appRoutes } from "@/data/appRoutes";

export const axiosClient = axios.create({
  baseURL: appRoutes.baseUrl,
});
