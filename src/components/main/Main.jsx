import React, { useEffect, useState } from "react";
import "./main.scss";
import { useDispatch, useSelector } from "react-redux";
import { getRepos } from "../actions/repos";
import Repo from "./repo/Repo";
import { setCurrentPage } from "../../reducers/reposReducer";
import { createPages } from "../../utils/pagesCreator";

const Main = () => {
  const dispatch = useDispatch();
  const repos = useSelector((state) => state.items);
  const isFething = useSelector((state) => state.isFething);
  const currentPage = useSelector((state) => state.currentPage);
  const totalCount = useSelector((state) => state.totalCount);
  const perPage = useSelector((state) => state.perPage);
  const isFetchError = useSelector((state) => state.isFetchError);
  const [searchValue, setSearchValue] = useState("");
  const pagesCount = Math.ceil(totalCount / perPage);
  const pages = [];

  createPages(pages, pagesCount, currentPage);

  useEffect(() => {
    dispatch(getRepos(searchValue, currentPage, perPage));
  }, [currentPage]);

  function searchHendler() {
    dispatch(setCurrentPage(1));
    dispatch(getRepos(searchValue));
  }

  return (
    <div>
      {isFetchError && (
        <div class="alert alert-danger" role="alert">
          Произошла ошибка. Пожалуйста обновите старницу!
        </div>
      )}
      <div className="search">
        <input
          type="text"
          className="search-input"
          placeholder="Input repo name"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              searchHendler();
            }
          }}
        />
        <button className="search-btn" onClick={() => searchHendler()}>
          Search
        </button>
      </div>
      {!isFething ? (
        repos.map((repo, index) => <Repo repo={repo} key={index} />)
      ) : (
        <div className="fetching"></div>
      )}
      <div className="pages">
        {pages.map((page, index) => (
          <span
            key={index}
            className={currentPage == page ? "current-page" : "page"}
            onClick={() => dispatch(setCurrentPage(page))}
          >
            {page}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Main;
