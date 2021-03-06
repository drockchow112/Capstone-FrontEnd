import axios from "axios";
const custom = require('./apikey');
const API_KEY=custom.config.API_KEY
const wordArr = [ "Camera","PANCIL"];
// Action Types
const FETCH_ALL_PRODUCTS = "FETCH_ALL_PRODUCTS";

// Action Creators
const fetchAllProducts = (product) => {
  return {
    type: FETCH_ALL_PRODUCTS,
    payload: product,
  };
};
// Thunk Creators
export const fetchAllProductsThunk = () => (dispatch) => {
  const item = wordArr[Math.floor(Math.random() * 3)];
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url=`https://api.barcodelookup.com/v2/products?search=${item}&formatted=y&key=${API_KEY}`
  return axios
    .get(proxyurl+url)
    .then((res) => res.data.products)
    .then((items) => dispatch(fetchAllProducts(items)))
    .catch((err) => console.log(err));
};

// Reducer
const reducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ALL_PRODUCTS:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
