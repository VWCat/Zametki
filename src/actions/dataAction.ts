export const ADD_DATA = 'ADD_DATA' 
export const REMOVE_DATA = 'REMOVE_DATA' 

export function addData(title:string, body:string, createDate:Date, editDate:Date, url:string, index:number) {
    return {
      type: ADD_DATA,
      payload: {title, body, createDate, editDate, url},
      index: index
    }
}

export function removeData(id:number) {
    return {
      type: REMOVE_DATA,
      payload: {id},
    }
}