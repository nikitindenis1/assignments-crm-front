import React from "react";
const AssignmentLoader = (props) => {
  const { arr } = props;
  return arr.map((m) => {
    return (
      <div className="loader__element assignment__loader">
        <figure></figure>
      </div>
    );
  });
};
export default AssignmentLoader;
