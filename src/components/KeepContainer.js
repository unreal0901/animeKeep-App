import React, { useContext, useState } from "react";
import "../styles/keepContainer.css";
import { keepContext } from "../App";
import KeepItem from "./KeepItem";
import Detail from "./Detail";
const KeepContainer = ({ myKeep, filter, setMyKeep }) => {
  const [id, setId] = useState(null);
  const { exist, added, open, setOpen, empty } = useContext(keepContext);
  const ytURI = `https://www.youtube.com/embed/${open[0]}?controls=0&modestbranding=1`;

  // if (ele) ele.addEventListener("click", handleClose);
  function handleClose() {
    console.log("clicked");
    if (open[1]) setOpen([null, false]);
  }

  // console.log(open[0]);

  return (
    <>
      <div id="containerkeep" className="containerkeep">
        {empty ? (
          <div className="emptycontainer">
            <i className="fa-solid fa-book-open"></i>
            <p>Add Some animes</p>
          </div>
        ) : null}
        <div className="animestack">
          {exist ? (
            <p className="errorExist">
              <span>It already exist</span>
            </p>
          ) : null}
          {added ? (
            <p className="addNoti">
              <span>Added</span>
            </p>
          ) : null}
          {myKeep.map((item, i) => {
            if (item) {
              const {
                titles: { en, en_us, en_jp },
              } = item;
              const mainTitle = en || en_us || en_jp;
              return (
                <KeepItem
                  filter={filter}
                  key={item.id}
                  open={open}
                  setOpen={setOpen}
                  mainTitle={mainTitle}
                  item={item}
                  myKeep={myKeep}
                  setMyKeep={setMyKeep}
                  id={id}
                  setId={setId}
                />
              );
            }
            return null;
          })}
        </div>
        {open[1] ? (
          <button className="closeBtn" onClick={handleClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        ) : null}

        {open[1] ? (
          <>
            <div className="fullview">
              <div className="wrapperiframe">
                <div className="video">
                  <iframe
                    id="iframe"
                    className="iframe"
                    src={`${ytURI}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    // allowFullScreen
                  ></iframe>
                </div>
              </div>
              <div className="synopsis">
                <Detail open={open} myKeep={myKeep} id={id} />
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default KeepContainer;
