import { CreateDeviceModelInfo } from "@/types/deviceModel";
import { fetchData, postData } from "./_fetch";

export const find_device_model = async () => fetchData("/device-model");

export const find_device_model_select = async () =>
  fetchData("/device-model/select");

export const create_device_model = async (req: CreateDeviceModelInfo) =>
  postData("/device-model/create", req);
