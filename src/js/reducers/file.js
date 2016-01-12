export const SET_STATE = "FILE/SET_STATE";

export default function fileReducer(state = {}, action) {

    if (action.type === SET_STATE) {
        const { fileId, title } = action;
        return { fileId, title }
    }

    return state;

}
