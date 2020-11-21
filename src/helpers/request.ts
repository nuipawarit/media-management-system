import axios, { AxiosRequestConfig } from "axios";
import { stringify } from "qs";

function request<Result = never>({
  baseURL = undefined,
  cancelToken = undefined,
  data = undefined,
  headers = {},
  method = "GET",
  params = {},
  url,
}: AxiosRequestConfig) {
  const httpConfig = {
    paramsSerializer: (p: any) => stringify(p),
  };
  const httpOptions = {
    baseURL,
    cancelToken,
    data,
    headers: {
      ...headers,
    },
    method,
    params,
    url,
  };

  // Create an HTTP client instance
  const requestInstance = axios.create(httpConfig);

  // Request interceptor
  requestInstance.interceptors.request.use(
    (request) => {
      // Do something before request is sent
      return request;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Response interceptor
  requestInstance.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data

      // If the request succeeds, just bypass this interception and return Axios response
      return response; // Axios response object
    },
    (error) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error

      // If the error is due to other reasons, throw it back to Axios
      return Promise.reject(error);
    }
  );

  // Start making an HTTP request
  return requestInstance(httpOptions).catch<Result>((error) => {
    // Operation canceled by the user
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // TODO: Remove debugging logs
      // console.log(
      //   'The server responded with a status code that falls out of the range of 2xx:',
      //   error.response,
      // );
    }

    if (error.request) {
      // The request was made but no response was received
      // TODO: Remove debugging logs
      // console.log(
      //   'The request was made but no response was received:',
      //   error.request,
      // );
    }

    // Something happened in setting up the request that triggered an Error

    // TODO: Remove debugging logs
    // console.log(
    //   'Something happened in setting up the request that triggered an Error:',
    //   error,
    // );

    // If the error is due to other reasons, throw it to a caller anyway
    return Promise.reject(error);
  });
}

export default request;
