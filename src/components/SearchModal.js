import React from "react";
import SearchModalContainer from "./SearchModalContainer";
import "../styles/searchModal.css";

const SearchModal = ({ handleSubmit, searchResult, loading, setOpen }) => {
  return (
    <>
      <div className="topNav">
        <div className="logo">
          <a href="#containerkeep" onClick={() => setOpen([null, false])}>
            {" "}
            <h1>
              Anime<span>Keep</span>
            </h1>
          </a>
        </div>
        <form
          className="searchbox__container"
          action=""
          onSubmit={handleSubmit}
        >
          <div className="searchbox">
            <label htmlFor="animename">
              <input
                autoFocus
                className="inputbox"
                type="text"
                placeholder="...Search for anime"
                name="animename"
              />
            </label>
          </div>
          <button className="searchBtn" type="Submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
      {/* <div className="wrapper"> */}
      <SearchModalContainer loading={loading} searchResult={searchResult} />
      {/* </div> */}
    </>
  );
};

export default SearchModal;
