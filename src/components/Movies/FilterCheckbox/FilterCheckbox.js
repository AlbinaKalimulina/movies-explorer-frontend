import React, { useState } from "react";

function FilterCheckbox() {
  const [short, changeShort] = useState(true);

  return (
    <div className="filter">
      <input
        type="checkbox"
        id="checkbox"
        className="filter__ckeck"
        onChange={() => { changeShort(!short) }}
        checked={short}
      />
    </div>
  );
};

export default FilterCheckbox;