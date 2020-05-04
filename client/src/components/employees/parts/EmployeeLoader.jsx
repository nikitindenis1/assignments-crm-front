import React from "react";
const EmployeeLoader = (props) => {
  const { arr } = props;
  return arr.map((m) => {
    return (
      <div className="loader__element employee__loader">
        <figure></figure>
      </div>
    );
  });
};
export default EmployeeLoader;
