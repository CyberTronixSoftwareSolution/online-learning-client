import { createContext, useContext, useState } from "react";
import axios, { AxiosInstance } from "axios";

interface LoadingContextType {
  loading: boolean;
  setLoadingState: (isLoading: boolean) => void;
  axiosInstance: AxiosInstance;
}

export const LoadingContext = createContext<LoadingContextType>(
  {} as LoadingContextType
);

export const useLoading = () => {
  return useContext(LoadingContext);
};

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(false);

  const setLoadingState = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  // " https://backendnizz.onrender.com"
  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Intercept Axios requests to set loading state
  axiosInstance.interceptors.request.use(
    (config) => {
      setLoadingState(true);
      return config;
    },
    (error) => {
      setLoadingState(false);
      return Promise.reject(error);
    }
  );

  // Intercept Axios responses to set loading state
  axiosInstance.interceptors.response.use(
    (response) => {
      setLoadingState(false);
      return response;
    },
    (error) => {
      setLoadingState(false);
      return Promise.reject(error);
    }
  );

  return (
    <LoadingContext.Provider
      value={{
        loading,
        setLoadingState,
        axiosInstance,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};
