import ErrorBoundary from "../../hoc/ErrorBoundary";
import useApp from "../../hooks/useApp";
import MetarDecryption from "../MetarDecryption/MetarDecryption";
import MetarReport from "../MetarReport/MetarReport";
import Spinner from "../Spinner/Spinner";

const InfoBlock: React.FC = () => {
  const { isLoading } = useApp();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ErrorBoundary>
      <MetarReport />
      <MetarDecryption />
    </ErrorBoundary>
  );
};

export default InfoBlock;
