import * as TYPES from './types'
//通过函数addNum 生成action
export const addNum=(num)=>{
    return {
        type:TYPES.ADD,
        num:num,
    }
}

export const desNum=(num)=>{
    return {
        type:TYPES.DES,
        num:num,
    }
}
export const updateText=(text)=>{
    return {
        type:TYPES.UPDATE_TEXT,
        text:text,
    }
}