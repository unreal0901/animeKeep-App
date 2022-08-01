import React from "react";
import AddtoKeep from "./AddtoKeep";
import "../styles/searchModalContainer.css";

const SearchModalContainer = ({ loading, searchResult }) => {
  function getSeason(month) {
    switch (month) {
      case 0:
      case 1:
      case 2:
        return "Winter";
      // break;
      case 3:
      case 4:
      case 5:
        return "Spring";
      // break;
      case 6:
      case 7:
      case 8:
        return "Summer";
      // break;
      case 9:
      case 10:
      case 11:
        return "Fall";
      // break;
      default:
        return "";
    }
  }

  function capitalize(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  }

  return (
    <>
      <div className="search__items">
        {searchResult ? (
          searchResult.map((item) => {
            const {
              attributes: {
                posterImage: { original },
                canonicalTitle,
                showType,
                episodeCount,
                titles,
                status,
                startDate,
              },
            } = item;
            const { en, en_us, en_jp } = titles;
            const mainTitle = en || en_us || en_jp;
            const dateObj = new Date(startDate);
            const year = dateObj.getFullYear();
            const month = dateObj.getMonth();
            const season = getSeason(month);
            return (
              <div key={item.id} className="item">
                <figure>
                  <img
                    className="coverImg"
                    src={original}
                    alt={canonicalTitle}
                  />
                </figure>
                <figcaption>
                  <div className="description">
                    <p className="title">{capitalize(mainTitle)}</p>
                    <p className="showTypeEp">
                      <span className="showType">
                        {capitalize(showType)}&nbsp;-&nbsp;
                      </span>
                      <span className="ep">
                        {episodeCount}&nbsp;Episodes&nbsp;({capitalize(status)}
                        &nbsp;
                        {status === "finished" || status === "current"
                          ? "Airing"
                          : ""}
                        )
                      </span>
                    </p>
                    <p className="airDetails">
                      {season}&nbsp;{year}
                    </p>
                  </div>
                </figcaption>
                <AddtoKeep item={item} />
              </div>
            );
          })
        ) : (
          <div>Search Anime or See trending list</div>
        )}
      </div>
    </>
  );
};

export default SearchModalContainer;
