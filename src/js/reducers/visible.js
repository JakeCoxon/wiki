import removeAt from '../util/removeAt.js'
import documents from './documents.js'

export const TOGGLE = "VISIBLE/TOGGLE"
export const SHOW = "VISIBLE/SHOW"
export const SHOW_AT = "VISIBLE/SHOW_AT"
export const HIDE = "VISIBLE/HIDE"
export const HIDE_INDEX = "VISIBLE/HIDE_INDEX"
export const HIDE_ALL = "VISIBLE/HIDE_ALL"

export default function visibleReducer(state = [], action) {

    if (action.type === TOGGLE) {
        const { documentId } = action;
        const index = state.indexOf(documentId);
        if (index === -1) 
            return visibleReducer(state, { type: SHOW, documentId });
        else 
            return visibleReducer(state, { type: HIDE, documentId });
    }

    else if (action.type === SHOW) {
        const { documentId } = action;
        const index = state.indexOf(documentId);
        if (index === -1)
            return [ documentId, ...state ];
    }

    else if (action.type === SHOW_AT) {
        const { documentId, visibleId } = action;
        const index = state.indexOf(documentId);
        if (index === -1)
            return [
                ..._.slice(state, 0, visibleId),
                documentId,
                ..._.slice(state, visibleId)
            ];
    }

    else if (action.type === HIDE) {
        const { documentId } = action;
        return state.filter(id => documentId != id);
    }

    else if (action.type === HIDE_INDEX) {
        const { index } = action;
        return removeAt(state, index);
    }

    else if (action.type === HIDE_ALL) {
        return [];
    }

    else if (action.type === documents.REMOVE) {
        const { id } = action;
        return treeReducer(state, { type: HIDE, documentId: id });
    }

    else if (action.type === documents.REMOVE_ALL) {
        return treeReducer(state, { type: HIDE_ALL });
    }

    return state;

}