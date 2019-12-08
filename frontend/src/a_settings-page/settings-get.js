import config from '../config.json';
import queryAPI from '../z_utils/queryAPI';

//----------------------------------------------------------------
const BEGIN = 'getSetti/BEGIN';
const SUCCESS = 'getSetti/SUCCESS';
const FAILURE = 'getSetti/FAILURE';

//----------------------------------------------------------------
const initialState = {
  configSettings: {},
  apiProvider: config.apiProvider,
  isLoading: false,
  error: null
};

//----------------------------------------------------------------
export default (state = initialState, action) => {
  console.log('getSetti', action, state);
  switch (action.type) {
    case BEGIN:
      return {
        ...state,
        isLoading: true
      };

    case SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        configSettings: action.payload
      };

    case FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.e
      };

    default:
      return state;
  }
};

//----------------------------------------------------------------
export const getSettings = () => {
  return (dispatch, getState) => {
    dispatch({
      type: BEGIN
    });

    return queryAPI(getState().getSettings.apiProvider, 'config', 'get')
      .then(async (res) => {
        const json = await res.json();
        const data = json.data[0];
        dispatch({
          type: SUCCESS,
          payload: data
        });
        return data;
      })
      .catch((e) => {
        dispatch({
          type: FAILURE,
          e
        });
      });
  };
};