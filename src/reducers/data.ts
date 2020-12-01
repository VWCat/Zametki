import {ADD_DATA, REMOVE_DATA} from '../actions/dataAction'

const initialState = {
    data: [
        {title: 'First Item', body: 'Body of Fist Item', createDate: '12.12.2020', editDate: '21.12.2020', url: 'https://reactnative.dev/img/tiny_logo.png'},
        {title: 'Second jhgjhjgjhgjhgjhg Item', body: 'Body of Second Item', createDate: '12.12.2020', editDate: '21.12.2020', url: ''},
        {title: 'Third Item', body: 'Body of Third Item', createDate: '12.12.2020', editDate: '21.12.2020', url: ''},
      ],
}
  
export function dataReducer(state = initialState, action:any) {
    switch (action.type) {
        case ADD_DATA:
            return { 
                ...state,
                data: [
                    ...state.data.slice(0, action.index),
                    action.payload,
                    ...state.data.slice(action.index+1),
                ]
            };
        
        case REMOVE_DATA:
            return { 
                ...state,
                data: [
                    ...state.data.slice(0, action.payload.id),
                    ...state.data.slice(action.payload.id+1),
                ]
            };
  
        default:
            return state;
    }
}


