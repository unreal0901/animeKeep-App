import React from "react";

const KeepContainer = ({ myKeep }) =>
  myKeep.map((item) => {
    const {
      attributes: {
        titles: { en, en_us, en_jp },
      },
    } = item;
    const mainTitle = en || en_us || en_jp;
    return <h1 key={item.id}>{mainTitle}</h1>;
  });

export default KeepContainer;
