import dayjs from "dayjs";

export const now = () => dayjs().format("YYYY/MM/DD HH:mm:ss");

export const format = (date?: dayjs.ConfigType) =>
  dayjs(date).format("YYYY/MM/DD HH:mm:ss");
