import data from "./app.js";
import "./styles.css";
import { useState } from "react";

export default function Accordian() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  const handleSingleSelection = (id) => {
    setSelected(id === selected ? null : id);
  };

  const handleMultipleSelection = (id) => {
    const multiplecpy = [...multiple];
    const findIndexOfId = multiplecpy.indexOf(id);

    if (findIndexOfId === -1) {
      multiplecpy.push(id);
    } else {
      multiplecpy.splice(findIndexOfId, 1);
    }
    console.log(findIndexOfId);

    setMultiple(multiplecpy);
  };

  console.log(multiple, selected);
  return (
    <div className="wrapper">
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        Enable Multi Selection
      </button>
      <div className="accordion">
        {data && data.length > 0 ? (
          data.map((item) => (
            <div
              className="item"
              key={item.id}
              onClick={() => {
                enableMultiSelection
                  ? handleMultipleSelection(item.id)
                  : handleSingleSelection(item.id);
              }}
            >
              <div className="title">
                <h3>{item.question}</h3>
                <span>+</span>
              </div>
              {enableMultiSelection
                ? multiple.indexOf(item.id) !== -1 && (
                    <div className="hiddenContent">{item.answer}</div>
                  )
                : item.id === selected && (
                    <div className="hiddenContent">{item.answer}</div>
                  )}
            </div>
          ))
        ) : (
          <div>No Data available</div>
        )}
      </div>
    </div>
  );
}
