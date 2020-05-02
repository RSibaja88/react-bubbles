import React, { useState, useEffect } from "react";
import axiosWithAuth from "./axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  
  useEffect(() => {
    axiosWithAuth().get('api/colors')
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
