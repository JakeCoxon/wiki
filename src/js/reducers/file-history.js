export const ADD = "FILE_HISTORY/ADD"

export default function fileHistoryReducer(state = [], action) {

    if (action.type === ADD) {
        const { fileId, title } = action;
        const filteredHistory = state.filter(history => history.fileId !== fileId);
        return [{ fileId, title }, ...filteredHistory];
    }

    return state;

}