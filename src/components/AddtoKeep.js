import React, { useContext } from "react";
import { keepContext } from "../App";

const AddtoKeep = ({ item }) => {
  const { myKeep, setMyKeep } = useContext(keepContext);
  function alreadyExist(item) {
    let flag = 0;
    myKeep.forEach((keepItem) => {
      if (keepItem.id === item.id) {
        flag = 1;
      }
    });

    flag === 1
      ? console.log("Item already exist")
      : setMyKeep(myKeep.concat(item));
  }
  return (
    <div className="addtokeep">
      <button className="btnadd" onClick={() => alreadyExist(item)}>
        +
      </button>
    </div>
  );
};

export default AddtoKeep;
