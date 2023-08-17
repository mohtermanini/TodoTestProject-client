import SpinLoader from "@/components/UI/SpinLoader/SpinLoader";
import React, { createContext, useContext, useState } from "react";
import { CSSTransition } from "react-transition-group";

const LoaderContext = createContext();

export default function LoaderProvider({ children }) {
  const [loaderCount, setLoaderCount] = useState(0);

  function incrementLoaderCount() {
    setLoaderCount((prevLoadingCount) => prevLoadingCount + 1);
  }

  function decrementLoaderCount() {
    setLoaderCount((prevLoadingCount) => {
      if (prevLoadingCount === 0) {
        throw new Error(
          "Can not decrement loadings count, there are 0 loadings."
        );
      }
      return prevLoadingCount - 1;
    });
  }

  return (
    <LoaderContext.Provider
      value={{
        incrementLoaderCount,
        decrementLoaderCount,
        isLoading: loaderCount > 0,
      }}
    >
      <>
        <CSSTransition
          in={loaderCount > 0}
          timeout={250}
          classNames={"fade"}
          unmountOnExit
        >
          <SpinLoader />
        </CSSTransition>
        {children}
      </>
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  return useContext(LoaderContext);
}
