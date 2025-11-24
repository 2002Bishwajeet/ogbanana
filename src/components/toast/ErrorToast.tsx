import { useEffect, useRef, type FC } from "react";
import { useToast } from "../../context/ToastContext";

interface ErrorToastProps {
  error: unknown;
}

export const ErrorToast: FC<ErrorToastProps> = ({ error }) => {
  const { addToast } = useToast();
  const handledAnError = useRef(false);

  useEffect(() => {
    if (error && !handledAnError.current) {
      handledAnError.current = true;
      let errorMessage = "An unknown error occurred.";
      if (typeof error === "string") {
        errorMessage = error;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in error
      ) {
        errorMessage = String(error.message);
      }
      addToast(errorMessage, "error");
    }
  }, [error, addToast]);

  return <></>;
};
