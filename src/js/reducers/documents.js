export const INSERT = "DOC/INSERT"
export const REMOVE = "DOC/REMOVE"
export const UPDATE = "DOC/UPDATE"
export const REMOVE_ALL = "DOC/REMOVE_ALL"

export default function docReducer(state = {}, action) {

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