
import * as TimerActions from '../action-types/timer-action-types';
const initialState = { name: '', duration: 0 }


export default function timer(state = initialState, action) {
  switch(action.type) {

    case TimerActions.SET_TIMER:
      return {
        name: action.name,
        duration: action.duration
      }

    default:
      return state;
  }
}
