import React, { useState, useCallback } from "react";
import { render } from "react-dom";
import Gallery from "react-photo-gallery";
import SelectedImage from "./SelectedImage";
import { photos } from "./photos";

function App() {
  const [selectAll, setSelectAll] = useState(false);

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  const imageRenderer = useCallback(
    ({ index, left, top, key, photo }) => (
      <div>
        <div>PREVIEW</div>
      <SelectedImage
        selected={selectAll ? true : false}
        key={key}
        margin={"2px"}
        index={index}
        photo={photo}
        left={left}
        top={top}
      />
      </div>
    ),
    [selectAll]
  );

  return (
    <div>
      <p>
        <button onClick={toggleSelectAll}>toggle select all</button>
      </p>
      <Gallery photos={photos} renderImage={imageRenderer} />
    </div>
  );
}

render(<App />, document.getElementById("app"));
