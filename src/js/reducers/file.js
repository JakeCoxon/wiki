export const LOAD_SUCCESS = "FILE/LOAD_SUCCESS";

export default function fileReducer(state = {}, action) {

    if (action.type === LOAD_SUCCESS) {
        const { fileId, title } = action;
        return { fileId, title }
    }

    return state;

}
