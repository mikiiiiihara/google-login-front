import { AxiosError } from "axios";

export const isUnAuthorizedError = (error: unknown) => {
  return error instanceof AxiosError && error.response?.data.statusCode == 401;
};
