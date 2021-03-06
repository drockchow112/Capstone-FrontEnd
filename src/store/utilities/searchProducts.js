import axios from "axios";
const custom = require('./apikey');
const API_KEY=custom.config.API_KEY
// Action Types
const SEARCH_PRODUCTS="SEARCH_PRODUCTS";

// Action Creators
const searchProducts=(product)=>{
  return {
    type: SEARCH_PRODUCTS,
    payload: product,
  };
}
// Thunk Creators
export const searchProductsThunk = (search, ownProps) => (dispatch) => {
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url=`https://api.barcodelookup.com/v2/products?search=${Object.values(search)[0]}&formatted=y&key=${API_KEY}`
  return axios
    .get(proxyurl+url)
    .then((res) => res.data.products)
    .then((items) => {

      dispatch(searchProducts(items))
      ownProps.history.push("/products/s/search");
    })
    .catch((err) => console.log(err));
};

// Reducer
const reducer = (state = {}, action) => {
  switch (action.type) {
    case SEARCH_PRODUCTS:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
