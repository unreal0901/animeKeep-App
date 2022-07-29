import React from "react";
import SearchModalContainer from "./SearchModalContainer";

const SearchModal = ({ handleSubmit, searchResult }) => {
  return (
    <>
      <div className="searchForm">
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="animename">
            <input
              type="text"
              placeholder="Search for anime"
              name="animename"
            />
          </label>
          <button type="Submit">Submit</button>
        </form>
      </div>
      <SearchModalContainer searchResult={searchResult} />
    </>
  );
};

export default SearchModal;
