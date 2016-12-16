import {
    combineReducers
} from 'redux';

// import menu from '../views/Menu/modules/Menu';
import user from '../reducers/user';
import menu from '../reducers/menu';
import tableDemo from '../reducers/tableDemo';
import demo from '../reducers/demo';

export default combineReducers({
    user,
    menu,
    tableDemo,
    demo,
});
