
const reducers = function (state = {lang : 'en'}, action) {
  return {
    ...state,
    ...action.payload,
  }
}

export default reducers