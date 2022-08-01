import React, { useContext } from "react";
import { keepContext } from "../App";

const EditModal = ({ id, setModal, keep, setMyKeep, filter }) => {
  const { setChange, editKeep } = useContext(keepContext);
  function closeModal() {
    setModal(false);
  }

  function extractYoutubeId(yid) {
    if (yid.includes("v=")) return yid.slice(yid.indexOf("v=") + 2);
    else {
      let temp = yid.slice(8);
      return temp.slice(temp.indexOf("/") + 1);
    }
  }

  function handleSubmit(id, name, ytId, views) {
    ytId = extractYoutubeId(ytId);
    console.table(id, name, ytId, views);
    const newItem = keep.map((item) => {
      let newObj = Object.defineProperties(
        {},
        Object.getOwnPropertyDescriptors(item)
      );
      // console.log(newObj);
      if (item.id === id) {
        newObj.canonicalTitle = name;
        newObj.youtubeVideoId = ytId;
        newObj.titles = { en: `${name}` };
        newObj.views = views;
      }
      return newObj;
    });
    filter(id);
    editKeep(newItem);
    // setMyKeep([{ hello: "hohohoohoho" }]);
    // console.log(newKeep === keep);
    setChange(true);
    closeModal();
  }

  return (
    <>
      <div className="editModal">
        <div className="closemodal">
          <button onClick={closeModal}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(
              id,
              e.target.name.value,
              e.target.youtubeId.value,
              e.target.views.value
            );
          }}
        >
          <div className="modaldescription">
            <div className="labels">
              <label htmlFor="name">Title</label>
              <label htmlFor="youtubeId">youtubeID</label>
            </div>
            <div className="inputs">
              <input
                required
                type="text"
                name="name"
                placeholder="change title"
              />
              <input
                type="text"
                name="youtubeId"
                placeholder="change youtube link"
              />
            </div>
          </div>
          <label htmlFor="views" className="views">
            Views
          </label>
          <div className="textarea">
            <textarea
              name="views"
              placeholder="Enter your views about this anime..."
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <div className="modalbtn">
            <button type="submit">Confirm</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditModal;
