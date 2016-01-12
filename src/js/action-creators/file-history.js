import * as fileHistoryConstants from '../reducers/file-history.js'

export function fileHistoryAdd(title, fileId) {
    return (dispatch, getState) => {

        fileId && dispatch({ type: fileHistoryConstants.ADD, fileId, title });

        const data = JSON.stringify(getState().fileHistory);

        localStorage.setItem('fileHistory', data);

    }
}

export function fileHistoryLoad() {
    return (dispatch) => {
        const historyString = localStorage.getItem('fileHistory');

        const histories = (historyString && JSON.parse(historyString) || []).reverse();
        histories.forEach(({ title, fileId }) => dispatch(fileHistoryAdd(title, fileId)))
    }
}