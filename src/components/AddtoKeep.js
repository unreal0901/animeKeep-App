import React, { useContext } from "react";
import { keepContext } from "../App";

const AddtoKeep = ({ item }) => {
  const { myKeep, setMyKeep, setExist, setAdded, restoreStorage, setEmpty } =
    useContext(keepContext);
  function alreadyExist(item) {
    setExist(false);
    let flag = 0;
    myKeep.forEach((keepItem) => {
      if (keepItem.id === item.id) {
        flag = 1;
      }
    });

    if (flag === 1) {
      setExist(true);
    } else {
      const {
        id,
        attributes: {
          posterImage: { original },
          canonicalTitle,
          showType,
          episodeCount,
          titles,
          status,
          startDate,
          youtubeVideoId,
          synopsis,
          averageRating,
          episodeLength,
        },
        relationships: {
          animeCharacters: {
            links: { related: animeCharactersLink },
          },
          categories: {
            links: { related: categoryLink },
          },
        },
      } = item;
      const { en, en_us, en_jp } = titles;
      const mainTitle = en || en_us || en_jp;
      let obj = {};
      obj.id = id;
      obj.original = original;
      obj.canonicalTitle = canonicalTitle;
      obj.showType = showType;
      obj.titles = titles;
      obj.status = status;
      obj.episodeCount = episodeCount;
      obj.startDate = startDate;
      obj.mainTitle = mainTitle;
      obj.youtubeVideoId = youtubeVideoId;
      obj.animeCharactersLink = animeCharactersLink;
      obj.categoryLink = categoryLink;
      obj.synopsis = synopsis;
      obj.averageRating = averageRating;
      obj.episodeLength = episodeLength;
      // setMyKeep(myKeep.concat(item));
      setMyKeep(myKeep.concat(obj));
      setEmpty(false);
      setAdded(true);
      restoreStorage();
    }
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
