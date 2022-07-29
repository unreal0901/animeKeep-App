import React, { useEffect, useState } from "react";
import KeepContainer from "./components/KeepContainer";
import SearchModal from "./components/SearchModal";

export const keepContext = React.createContext();
const App = () => {
  const baseURI = "https://kitsu.io/api/edge/anime?filter[text]=";
  // const trendingAnime = "https://kitsu.io/api/edge/trending/anime";
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [myKeep, setMyKeep] = useState([]);

  function handleSearch(e) {
    e.preventDefault();
    console.log(e.target.animename.value);
    setSearchTerm(e.target.animename.value);
  }

  async function fetchData(searchTerm) {
    try {
      const response = await fetch(`${baseURI}${searchTerm}`);
      const resjson = await response.json();
      setSearchResult([...resjson.data]);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (searchTerm) fetchData(searchTerm);
  }, [searchTerm]);

  return (
    <>
      {/* search Modal */}
      <keepContext.Provider value={{ myKeep, setMyKeep }}>
        <SearchModal
          searchTerm={searchTerm}
          setSearchTerm
          handleSubmit={handleSearch}
          searchResult={searchResult}
        />
        <KeepContainer myKeep={myKeep} />
      </keepContext.Provider>
    </>
  );
};

export default App;
