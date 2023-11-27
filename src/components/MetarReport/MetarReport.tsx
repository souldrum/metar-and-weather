import useApp from "../../hooks/useApp";
import InfoField from "../InfoField/InfoField";

const MetarReport: React.FC = () => {
  const { metar } = useApp();

  if (!metar) {
    return null;
  }

  return (
    <InfoField>
      <h3>METAR:</h3>
      <p>{metar}</p>
    </InfoField>
  );
};

export default MetarReport;
