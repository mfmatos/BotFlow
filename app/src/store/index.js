import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import utterReducer from '../reducers/utterReducer';
import { Utter } from '../utils/utter.js';
import intentReducer from '../reducers/intentReducer';
import { Intent } from '../utils/intent.js';

const INITIAL_STATE = {
  utters: [],
  filtered_utters: [],

  old_utter_texts: [],

  current_utter: new Utter(),
  old_utter: new Utter(),

  utter_submit_button_enable: false,
  helper_text: "",

  alternatives: false,

  intents: [],
  filtered_intents: [],

  old_intents_texts: [],

  current_intent: new Intent(),
  old_intent: new Intent(),

  intent_submit_button_enable: false,
};

function configureStore(state = INITIAL_STATE) {
  return createStore(intentReducer, state, applyMiddleware(thunk));
}

export default configureStore;
