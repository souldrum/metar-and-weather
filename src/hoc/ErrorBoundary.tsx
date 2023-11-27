import ErrorIndicator from "../components/Errors/ErrorIndicator";
import useApp from "../hooks/useApp";

const ErrorBoundary: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { errorData } = useApp();

  if (errorData) {
    return (
      <>
        <ErrorIndicator errorData={errorData} />
      </>
    );
  }
  return children;
};

export default ErrorBoundary;
