export const successResult = <TData extends object>(data: TData) => {
  return {
    success: true,
    data,
  };
};

export const faildResult = (message: string) => {
  return {
    success: false,
    message,
  };
};
