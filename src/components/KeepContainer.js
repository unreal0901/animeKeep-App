import React, { useContext, useState } from "react";
import "../styles/keepContainer.css";
import { keepContext } from "../App";
import KeepItem from "./KeepItem";
import Detail from "./Detail";
// import Footer from "./Footer";
const KeepContainer = ({ myKeep, filter, setMyKeep }) => {
  const [id, setId] = useState(null);
  const { exist, added, open, setOpen } = useContext(keepContext);
  const ytURI = `https://www.youtube.com/embed/${open[0]}?controls=0&modestbranding=1`;

  // if (ele) ele.addEventListener("click", handleClose);
  function handleClose() {
    let ele = document.querySelector(".animestack");
    if (open[1]) setOpen([null, false]);
    open[0] === null
      ? (ele.style.display = "none")
      : (ele.style.display = "block");
    setId(null);
  }

  console.log(id);
  console.log(myKeep);
  console.log(open);

  return (
    <>
      <div id="containerkeep" className="containerkeep">
        {myKeep.length === 0 ? (
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

        {open[1] && myKeep.length > 0 ? (
          <button className="closeBtn" onClick={handleClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        ) : null}

        {id === null ? (
          <div className="watch">
            <p>
              <i class="fa-solid fa-circle-play"></i>
            </p>
          </div>
        ) : null}
        {open[1] && myKeep.length > 0 ? (
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
      {/* {open[0] === null ? <Footer /> : null} */}
    </>
  );
};

export default KeepContainer;
