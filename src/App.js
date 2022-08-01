import React, { useEffect, useState } from "react";
import KeepContainer from "./components/KeepContainer";
import SearchModal from "./components/SearchModal";
import Footer from "./components/Footer";

export const keepContext = React.createContext();
const App = () => {
  const baseURI = "https://kitsu.io/api/edge/anime?filter[text]=";
  // const trendingAnime = "https://kitsu.io/api/edge/trending/anime";

  function localStorageItems() {
    if (localStorage.getItem("mykeep")) {
      return JSON.parse(localStorage.getItem("mykeep"));
    } else return null;
  }

  function restoreStorage() {
    if (localStorage.getItem("mykeep")) localStorage.clear();
    localStorage.setItem("mykeep", JSON.stringify(myKeep));
  }

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [myKeep, setMyKeep] = useState(localStorageItems() || []);
  // const [delId, setdelId] = useState(null);
  const [exist, setExist] = useState(false);
  const [added, setAdded] = useState(false);
  const [open, setOpen] = useState([null, false]);
  const [empty, setEmpty] = useState(true);
  const [change, setChange] = useState(false);

  function checkIfEmpty() {
    if (myKeep.length !== 0) setEmpty(false);
  }

  useEffect(checkIfEmpty, [myKeep]);

  let searchContainer;

  useEffect(restoreStorage, [myKeep]);

  function editKeep(newKeep) {
    console.log("old keep", myKeep);
    console.log("new item", newKeep);
    setMyKeep(newKeep);
    restoreStorage();
  }

  window.addEventListener("beforeunload", () => {
    localStorage.setItem("mykeep", [JSON.stringify(myKeep)]);
  });

  // function showConfirmBox() {
  //   console.log("changed");
  // }

  // useEffect(showConfirmBox, [change, myKeep]);

  function filter(delId) {
    setMyKeep(myKeep.filter((item) => item.id !== delId));
    checkIfEmpty();
  }

  function resset() {
    if (exist) setTimeout(() => setExist(false), 3000);
    if (added) setTimeout(() => setAdded(false), 3000);
  }

  useEffect(resset, [exist, added]);

  function handleFull() {
    const ele = document.querySelector(".fullview");
    if (ele) {
      if (open) {
        ele.classList.add("view");
      } else {
        ele.classList.remove("view");
      }
    }
  }

  useEffect(handleFull, [open]);

  function handleSearch(e) {
    e.preventDefault();
    console.log(e.target.animename.value);
    setSearchTerm(e.target.animename.value);
    searchContainer = document.querySelector(".search__items");
    if (e.target.animename.value) searchContainer.style.opacity = 1;
    searchContainer.style.display = "flex";
  }

  function handleClickOutside() {
    document.addEventListener("click", (e) => {
      const clickedItem =
        e.target.tagName +
        (e.target.classList[0] ? `.${e.target.classList[0]}` : "") +
        (e.target.classList[1] ? `.${e.target.classList[1]}` : "");
      const ele = document.querySelector(`${clickedItem}`);
      if (ele) {
        if (ele.closest("div.search__items")) return;
        else {
          if (searchContainer) searchContainer.style.display = "none";
        }
      }
    });
  }

  handleClickOutside();

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
      {/* <div className="toplevelwrapper"> */}
      {/* search Modal */}
      <keepContext.Provider
        value={{
          myKeep,
          setMyKeep,
          exist,
          setExist,
          setAdded,
          added,
          open,
          setOpen,
          change,
          setChange,
          editKeep,
          restoreStorage,
          empty,
          setEmpty,
        }}
      >
        <SearchModal
          searchTerm={searchTerm}
          setSearchTerm
          handleSubmit={handleSearch}
          searchResult={searchResult}
          empty={empty}
          setEmpty={setEmpty}
          setOpen={setOpen}
        />
        <KeepContainer myKeep={myKeep} setMyKeep={setMyKeep} filter={filter} />
      </keepContext.Provider>
      <Footer />
      {/* </div> */}
    </>
  );
};

export default App;
