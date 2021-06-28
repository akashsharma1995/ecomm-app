import React from "react";
import classes from "./Filters.module.css";

// Accepts name, options, value, onChange as props
// name: String (ex "size"),
// options: array (ex [{title: 'abc', value:'abc'}])
// value: String (selected value)
// onChange: function

const Filters = (props) => {
  const { name, options, value, handleFilterChange } = props;
  return (
    <div className={classes.container}>
      <div>{name + " "}</div>
      <div>
        <select value={value} onChange={(e) => handleFilterChange(e.target.value)}>
          {options.map((item) => (
            <option value={item.value} key={item.title}>
              {item.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
