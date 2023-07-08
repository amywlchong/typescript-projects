import { CoursePart } from "../App";
import Part from "./Part";

type CoursePartsArray = Array<CoursePart>;

type ContentProps = {
  courseParts: CoursePartsArray;
}

const Content = ({ courseParts }: ContentProps)  => {
  return (
    <>
      {courseParts.map((part, index) => (
        <Part key={index} coursePart={part} />
      ))}
    </>
  );
};

export default Content;
