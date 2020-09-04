const SET_REPOS = "SET_REPOS";
const SET_IS_FETHING = "SET_IS_FETHING";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_FETCH_ERROR = "SSET_FETCH_ERROR";

const defaultState = {
  items: [],
  isFetching: true,
  currentPage: 1, // равен номеру текущей страницы
  perPage: 10, // количество репозиториев отображаемое на одной странице
  totalCount: "0", // будет равняться всем полученным от gitHub репозиториям
  isFetchError: false, // найдена ошибка или нет
};

export default function reposReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_REPOS:
      return {
        ...state,
        items: action.payload.items,
        totalCount: action.payload.totalCount,
        isFething: false,
      };
    case SET_IS_FETHING:
      return {
        ...state,
        isFething: action.payload,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case SET_FETCH_ERROR:
      return {
        ...state,
        isFetchError: action.payload,
      };

    default:
      return state;
  }
}

export const setRepos = (repos) => ({ type: SET_REPOS, payload: repos });
export const setIsFething = (bool) => ({ type: SET_IS_FETHING, payload: bool }); //true в момент когда данные подгружаются и false на момент заверщенния
export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});
export const setFetchError = (bool) => ({ type: SET_FETCH_ERROR, payload: bool });

