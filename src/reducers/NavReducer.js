import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../navigation/app-navigator';
import * as NavActions from '../action-types/nav-action-types';

const tempAction = AppNavigator.router.getActionForPathAndParams('Home');
const tempState = AppNavigator.router.getStateForAction(tempAction);

export default function nav(state = tempState, action) {

  switch(action.type) {
    case 'HOME':
      return {
        ...state
      }

    default:
      return state;
  }

}
