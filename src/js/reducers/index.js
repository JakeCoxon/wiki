import removeAt from '../util/removeAt.js'

function docReducer(state = {}, action) {

    if (action.type === "DOC/UPDATE") {
        const { id, title, body } = action;
        const newDocument = { ...state[id], title, body };
        return { ...state, [id]: newDocument };
    }

    else if (action.type === "DOC/REMOVE") {
        const { id } = action;
        const newDocuments = { ...state };
        delete newDocuments[id];
        return newDocuments;
    }

    else if (action.type === "DOC/REMOVE_ALL") {
        return {};
    }

    else if (action.type === "DOC/INSERT") {
        const { id, title, body } = action;
        return { ...state, [id]: { id, title, body } };
    }

    return state;

}

function treeReducer(state = {}, action) {

    if (action.type === "TREE/INSERT") {
        const { folderId, documentId } = action;
        const newSubtree = [ ...(state[folderId] || []), documentId ];
        return { 
            ...state,
            [folderId]: newSubtree
        }
    }
    
    else if (action.type === "TREE/REMOVE") {
        const { documentId } = action;
        const stateWithoutDoc = _.omit(state, documentId);
        return _.mapValues(stateWithoutDoc, (subTree, folderId) => {
            return subTree.filter(id => documentId != id)
        })
    }

    else if (action.type === "TREE/REMOVE_ALL") {
        return {};
    }

    else if (action.type === "DOC/REMOVE") {
        const { id } = action;
        return treeReducer(state, { type: "TREE/REMOVE", documentId: id });
    }

    else if (action.type === "DOC/REMOVE_ALL") {
        return treeReducer(state, { type: "TREE/REMOVE_ALL" });
    }

    return state;

}

function visibleReducer(state = [], action) {

    if (action.type === "VISIBLE/TOGGLE") {
        const { documentId } = action;
        const index = state.indexOf(documentId);
        if (index === -1) 
            return visibleReducer(state, { type: "VISIBLE/SHOW", documentId });
        else 
            return visibleReducer(state, { type: "VISIBLE/HIDE", documentId });
    }

    else if (action.type === "VISIBLE/SHOW") {
        const { documentId } = action;
        const index = state.indexOf(documentId);
        if (index === -1)
            return [ documentId, ...state ];
    }

    else if (action.type === "VISIBLE/SHOW_AT") {
        const { documentId, visibleId } = action;
        const index = state.indexOf(documentId);
        if (index === -1)
            return [
                ..._.slice(state, 0, visibleId),
                documentId,
                ..._.slice(state, visibleId)
            ];
    }

    else if (action.type === "VISIBLE/HIDE") {
        const { documentId } = action;
        return state.filter(id => documentId != id);
    }

    else if (action.type === "VISIBLE/HIDE_INDEX") {
        const { index } = action;
        return removeAt(state, index);
    }

    else if (action.type === "VISIBLE/HIDE_ALL") {
        return [];
    }

    else if (action.type === "DOC/REMOVE") {
        const { id } = action;
        return treeReducer(state, { type: "VISIBLE/HIDE", documentId: id });
    }

    else if (action.type === "DOC/REMOVE_ALL") {
        return treeReducer(state, { type: "VISIBLE/HIDE_ALL" });
    }

    return state;

}

function fileReducer(state = {}, action) {

    if (action.type === "FILE/LOAD_SUCCESS") {
        const { fileId, title } = action;
        return { fileId, title }
    }

    return state;

}

function fileHistoryReducer(state = [], action) {

    if (action.type === "FILE_HISTORY/ADD") {
        const { fileId, title } = action;
        const filteredHistory = state.filter(history => history.fileId !== fileId);
        return [{ fileId, title }, ...filteredHistory];
    }

    return state;

}

export default function reducer(state = {}, action) {
    return { 
        documents: docReducer(state.documents, action),
        tree: treeReducer(state.tree, action),
        visible: visibleReducer(state.visible, action),
        file: fileReducer(state.file, action),
        fileHistory: fileHistoryReducer(state.fileHistory, action)
    };
}


