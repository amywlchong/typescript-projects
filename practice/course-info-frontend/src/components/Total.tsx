import { CoursePart } from "../App";

type CoursePartsArray = Array<CoursePart>;

type TotalProps = {
  courseParts: CoursePartsArray;
}

const Total = ({ courseParts }: TotalProps)  => {
  return (
    <p style={{ fontWeight: "bold" }}>
        Total number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

export default Total;
