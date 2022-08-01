import React, { useCallback, useEffect, useState } from "react";
import "../styles/details.css";

const Detail = ({ myKeep, id }) => {
  const [links, setLinks] = useState([]);
  const [categories, setcategories] = useState([]);
  const baseLinkUri = `https://kitsu.io/api/edge/anime/${id}/streaming-links`;
  const categoryLinkUri = `https://kitsu.io/api/edge/anime/${id}/categories`;

  // const callback=useCallback(,[baseLinkUri])
  const fetchAnimeLinks = useCallback(async () => {
    const response = await fetch(baseLinkUri);
    const resjson = await response.json();
    const data = resjson.data;
    setLinks([...data]);
  }, [baseLinkUri]);
  // async function fetchAnimeLinks() {
  //   const response = await fetch(baseLinkUri);
  //   const resjson = await response.json();
  //   const data = resjson.data;
  //   console.log(data);
  //   setLinks([...data]);
  // }
  // callback();

  const getcategorylinks = useCallback(async () => {
    const response = await fetch(categoryLinkUri);
    const resjson = await response.json();
    const data = resjson.data;
    setcategories([...data]);
  }, [categoryLinkUri]);

  useEffect(() => {
    fetchAnimeLinks();
    getcategorylinks();
  }, [id, fetchAnimeLinks, getcategorylinks]);

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

  // if (open[0] !== null) fetchAnimeLinks();

  const mainTitle = links[0]
    ? links[0].attributes.url ||
      links[1].attributes.url ||
      links[2].attributes.url ||
      links[3].attributes.url
    : "#";

  let types = [];
  categories.forEach((item) => {
    types.push(item.attributes.title);
  });

  return (
    <div className="completeDetails">
      {myKeep.map((item) => {
        const { canonicalTitle, showType, episodeCount, status, startDate } =
          item;
        const dateObj = new Date(startDate);
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth();
        const season = getSeason(month);
        if (item.id === id) {
          return (
            <div key={id} className="Details">
              <div className="animetitle">
                <h2>{item.canonicalTitle}</h2>&nbsp;
                <a href={mainTitle}>
                  <i className="fa-solid fa-link"></i>
                </a>
                {item.titles.ja_jp ? <h3>{item.titles.ja_jp}</h3> : null}
              </div>
              <div className="subdetails">
                <p className="synopsis">{item.synopsis}</p>
                <hr className="ruler" />
                <div className="categories">
                  <div className="semidetails">
                    <p className="fulltitle">{capitalize(canonicalTitle)}</p>
                    <p className="fullshowTypeEp">
                      <span className="fullshowType">
                        {capitalize(showType)}&nbsp;-&nbsp;
                      </span>
                      <span className="fullep">
                        {episodeCount}&nbsp;Episodes&nbsp;
                      </span>
                    </p>
                    <p>
                      ({capitalize(status)}
                      &nbsp;
                      {status === "finished" || status === "current"
                        ? "Airing"
                        : ""}
                      )
                    </p>
                    <p className="fullairDetails">
                      {season}&nbsp;{year}
                    </p>
                    {item.episodeLength ? (
                      <p className="eplength">
                        Episodes Length: {item.episodeLength}
                      </p>
                    ) : null}
                  </div>
                  <div className="types">
                    {types.slice(0, 3).map((item) => (
                      <p>{item}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        } else return null;
      })}
    </div>
  );
};

export default Detail;
