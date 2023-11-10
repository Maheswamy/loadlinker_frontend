import React, { useState, useEffect } from "react";
import Select from "react-select";

const ReactSelect = ({ permit, getSelectedPermit }) => {
  const options = permit.map((ele) => ({
    value: ele._id,
    label: ele.state,
  }));

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectAll = () => {
    if (selectedOptions.length === options.length) {
      // If all options are already selected, deselect all
      setSelectedOptions([]);
    } else {
      // Otherwise, select all options
      setSelectedOptions(options.map((option) => option.value));
    }
  };

  useEffect(() => {
    getSelectedPermit(selectedOptions);
  }, [selectedOptions]);

  return (
    <Select
      isMulti
      options={[{ value: "selectAll", label: "All India Permit" }, ...options]}
      value={options.filter((option) => selectedOptions.includes(option.value))}
      onChange={(selected) => {
        if (selected.some((option) => option.value === "selectAll")) {
          // If "Select All" is selected, handle it separately
          handleSelectAll();
        } else {
          // Otherwise, update selected options
          setSelectedOptions(selected.map((option) => option.value));
        }
      }}
      placeholder="Select options"
      isSearchable
    />
  );
};

export default ReactSelect;
