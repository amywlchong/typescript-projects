import HealthRatingBar from '../HealthRatingBar';

interface Props {
  healthCheckRating: number | null;
  setHealthCheckRating: React.Dispatch<React.SetStateAction<number | null>>
}

const HealthCheckEntryFields = ({ healthCheckRating, setHealthCheckRating }: Props) => {

  return (
    <>
      <HealthRatingBar showText={false} rating={healthCheckRating} readOnly={false} setRating={setHealthCheckRating} />
    </>
  )
}

export default HealthCheckEntryFields
