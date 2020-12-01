import {SET_TITLE} from '../actions/testAction'

const initialState = {
    title: 'Тестовый заголовок',
    caption: 'Some Text',
}
  
export function testReducer(state = initialState, action:any) {
    switch (action.type) {
        case SET_TITLE:
            return { ...state, title: action.payload }
  
        default:
            return state
    }
}

// export function testReducer(state = initialState) {
//     return state
    
// }