import { CoursePart } from "../App";

type PartProps = {
  coursePart: CoursePart;
}

// Helper function for exhaustive type checking
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ coursePart }: PartProps)  => {
  const renderCoursePart = (part: CoursePart) => {
    switch (part.kind) {
      case "basic":
        return (
          <div>
            <h2>
              {part.name} {part.exerciseCount}
            </h2>
            <p>
              {part.description}
            </p>
          </div>
        );
      case "group":
        return (
          <div>
            <h2>
              {part.name} {part.exerciseCount}
            </h2>
            <p>
              group projects: {part.groupProjectCount}
            </p>
          </div>
        );
      case "background":
        return (
          <div>
            <h2>
              {part.name} {part.exerciseCount}
            </h2>
            <p>
              {part.description}
            </p>
            <p>
              background material: {part.backgroundMaterial}
            </p>
          </div>
        );
      case "special":
        return (
          <div>
            <h2>
              {part.name} {part.exerciseCount}
            </h2>
            <p>
              {part.description}
            </p>
            <p>
              requirements: {part.requirements.join(", ")}
            </p>
          </div>
        )
      default:
        assertNever(part);
        return null;
    }
  };

  return (
    <>
      {renderCoursePart(coursePart)}
    </>
  );
};

export default Part;
