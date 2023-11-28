import { useState, useEffect } from "react";
import { handleError } from "../utils/errorHandlers";

const useFetchAndUpdateData = <T>(
  serviceFunction: () => Promise<T[] | T | undefined>,
  defaultMessage: string,
  notFoundMessage: string
) => {
  const [data, setData] = useState<T[] | T | null>(null);
  const [loadingData, setLoadingData] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);

      try {
        const responseData = await serviceFunction();
        if (responseData) {
          setData(responseData);
        }
      } catch (error: unknown) {
        const errorMessage = handleError(
          error,
          defaultMessage,
          notFoundMessage
        );
        setErrorMessage(errorMessage);
      }

      setLoadingData(false);
    };

    fetchData().catch((error) =>
      console.error("An error occurred while fetching data:", error)
    );
  }, []);

  const addToArray = (item: T): void => {
    if (Array.isArray(data)) {
      setData(data.concat(item));
    } else {
      console.warn("Attempted to use addToArray when data is not an array.");
    }
  };

  const updateItem = (updateFunction: (prevData: T) => T): void => {
    setData((prevData) => {
      if (!Array.isArray(prevData) && prevData !== null) {
        return updateFunction(prevData);
      } else {
        console.warn(
          "Attempted to use updateItem when data is an array or null."
        );
        return prevData;
      }
    });
  };

  return { data, loadingData, errorMessage, addToArray, updateItem };
};

export default useFetchAndUpdateData;
