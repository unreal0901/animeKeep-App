import React, { useState } from "react";
import "../styles/keepitem.css";
import EditModal from "./EditModal";

const KeepItem = ({
  item,
  mainTitle,
  open,
  setOpen,
  filter,
  myKeep,
  setMyKeep,
  setId,
}) => {
  const [modal, setModal] = useState(false);

  function openModal(id) {
    setModal(true);
  }

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

  function delItem(delId) {
    filter(delId);
  }

  function capitalize(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  }

  function toggleFull(yid, id) {
    open[1] ? setId(null) : setId(id);
    open[0] ? setOpen([null, false]) : setOpen([yid, true]);
  }

  const {
    id,
    original,
    canonicalTitle,
    showType,
    episodeCount,
    status,
    startDate,
  } = item;
  const dateObj = new Date(startDate);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();
  const season = getSeason(month);

  return (
    <div key={id} className="keepitem">
      <figure>
        <img className="keepimg" src={original} alt={canonicalTitle} />
      </figure>
      <figcaption>
        <div className="keepdescription">
          <p className="title">{capitalize(mainTitle)}</p>
          <p className="showTypeEp" style={{ width: "10px" }}>
            <span className="showType">
              {capitalize(showType)}&nbsp;-&nbsp;
            </span>
            <span className="ep">
              {episodeCount}&nbsp;Episodes&nbsp;({capitalize(status)}
              &nbsp;
              {status === "finished" || status === "current" ? "Airing" : ""})
            </span>
          </p>
          <p className="airDetails">
            {season}&nbsp;{year}
          </p>
        </div>
      </figcaption>
      <div className="btns">
        <div className="play">
          <button
            className="btnplay"
            onClick={() => toggleFull(item.youtubeVideoId, item.id)}
          >
            <i className="fa-solid fa-play"></i>
          </button>
        </div>
        <div className="delete">
          <button className="btndelete" onClick={() => delItem(item.id)}>
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </div>
        <div className="edit">
          <button className="btnedit" onClick={() => openModal(item.id)}>
            <i className="fa-solid fa-pencil"></i>
          </button>
        </div>
        {modal ? (
          <EditModal
            keep={myKeep}
            setMyKeep={setMyKeep}
            id={item.id}
            setModal={setModal}
            filter={filter}
          />
        ) : null}
      </div>
    </div>
  );
};

export default KeepItem;
