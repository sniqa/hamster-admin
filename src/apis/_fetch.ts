import { toast } from "sonner";

const BASE_URL = `http://localhost:3000`;

const requestInit = (data: Record<string, unknown>): RequestInit => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "",
    },
    body: JSON.stringify(data),
  };
};

export const fetchData = async (url: string) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`);
    const { success, data, message } = await response.json();
    if (success) {
      return data;
    }
    toast(message);
    return [];
  } catch (err) {
    toast(`${(err as Error).message}`);
  }
};

export const postData = async <TData extends Record<string, unknown>>(
  url: string,
  req: TData,
  tip?: string
) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, requestInit(req));
    const { success, data, message } = await response.json();

    if (success) {
      if (tip) {
        toast(tip);
      }
      return data;
    }

    toast(message);
    return null;
  } catch (err) {
    toast(`${(err as Error).message}`);
  }
};
