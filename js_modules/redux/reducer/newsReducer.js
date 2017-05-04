import * as TYPES from '../../redux/action/types'

export default function (state,action) {
    switch (action.type){
        case TYPES.NEWS_STATE.UN_READ:
            return {
                ...state,
                state:TYPES.NEWS_STATE.UN_READ
            }
        case TYPES.NEWS_STATE.READED:
            return {
                ...state,
                state:TYPES.NEWS_STATE.READED
            }
    }

}