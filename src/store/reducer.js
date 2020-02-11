import {
  MESSAGES_FAILURE,
  MESSAGES_REQUEST,
  MESSAGES_SUCCESS,
  SEND_MSG_ERROR,
  SEND_MSG_REQUEST, SEND_MSG_SUCCESS
} from "./actions";

const initialState = {
  messages : [],
  loadingReceive: false,
  loadingSend: false,
  error: ''
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGES_REQUEST:
      return {...state, loadingReceive: true};
    case MESSAGES_SUCCESS:
      return {...state, loading: false, messages: action.messages};
    case MESSAGES_FAILURE:
      return {...state, loadingReceive: false, error: action.e};
    case SEND_MSG_REQUEST:
      return {...state, loadingSend: true};
    case SEND_MSG_SUCCESS:
      return {...state, loadingSend: false};
    case SEND_MSG_ERROR:
      return {...state, loadingSend: false, error: action.e};
    default:
      return state
}
};

export default reducer;