import documents from './documents.js'

export const INSERT = "TREE/INSERT";
export const REMOVE = "TREE/REMOVE";
export const REMOVE_ALL = "TREE/REMOVE_ALL";

export default function treeReducer(state = {}, action) {

    if (action.type === INSERT) {
        const { folderId, documentId } = action;
        const newSubtree = [ ...(state[folderId] || []), documentId ];
        return { 
            ...state,
            [folderId]: newSubtree
        }
    }
    
    else if (action.type === REMOVE) {
        const { documentId } = action;
        const stateWithoutDoc = _.omit(state, documentId);
        return _.mapValues(stateWithoutDoc, (subTree, folderId) => {
            return subTree.filter(id => documentId != id)
        })
    }

    else if (action.type === REMOVE_ALL) {
        return {};
    }

    else if (action.type === documents.REMOVE) {
        const { id } = action;
        return treeReducer(state, { type: REMOVE, documentId: id });
    }

    else if (action.type === documents.REMOVE_ALL) {
        return treeReducer(state, { type: REMOVE_ALL });
    }

    return state;

}