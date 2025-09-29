import { TGenericErrorResponse } from "../interfaces/error.types";

export const handlerDuplicateError = (err: any): TGenericErrorResponse => {
  const duplicate = err.message.match(/"([^"]*)"/);

  return {
    statusCode: 400,
    message: `${duplicate ? duplicate[1] : "Value"} already exists!!`,
  };
};
