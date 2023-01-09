import { useRouteError } from "react-router-dom";
type RouterError = { statusText?: string; message: string };
export const ErrorPage = () => {
  const error = useRouteError() as RouterError;
  return (
    <div>
      <h1>Error</h1>
      <p>Something went wrong</p>
      <i>{error.statusText ?? error.message}</i>
    </div>
  );
};
