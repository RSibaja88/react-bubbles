import React, { useState, useEffect } from "react";
import axiosWithAuth from "./axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = (props) => {
  const [colorList, setColorList] = useState([]);
  
  useEffect(() => {
    axiosWithAuth().get('http://localhost:5000/api/bubble-page')
    .then(res => setColorList(res.data))
    .catch(error => console.error("Error from useEffect: BubblePage", error))
  }, [])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
