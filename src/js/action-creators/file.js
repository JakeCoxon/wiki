import GoogleDriveService from '../services/google-drive-service'
import { documentInsert } from './index.js'
import * as fileConstants from '../reducers/file.js'
import * as visibleConstants from '../reducers/visible.js'
import * as treeConstants from '../reducers/tree.js'
import * as documentsConstants from '../reducers/documents.js'
import * as fileHistoryConstants from '../reducers/file-history.js'

function resolveDataAndDispatch(dataPromise, dispatch) {
    return dataPromise
        .then(data => dispatch(fileLoadSuccess(data)))
        .catch(error => console.error(error));
}

export function filePick() {
    return (dispatch) => {
        const filePromise = GoogleDriveService.pick();
        return resolveDataAndDispatch(filePromise, dispatch);
    }
}

export function fileLoadGoogleId(fileId) {
    return (dispatch) => {
        const filePromise = GoogleDriveService.load(fileId);
        return resolveDataAndDispatch(filePromise, dispatch);
    }
}

export function fileLoadData(data) {
    return (dispatch) => {
        const dataPromise = Promise.resolve(data);
        return resolveDataAndDispatch(dataPromise, dispatch);
    }
}

export function fileLoadSuccess(fileData) {

    const { id, title, content } = fileData;

    return (dispatch) => {

        dispatch({ type: fileConstants.LOAD_SUCCESS, fileId: id, title });
        dispatch({ type: fileHistoryConstants.ADD, fileId: id, title });

        dispatch({ type: documentsConstants.REMOVE_ALL });


        _.forEach(content.documents, (document) => {
            const { id, title, body } = document;
            dispatch(documentInsert(id, title, body));
            dispatch({ type: treeConstants.INSERT, folderId: 'root', documentId: id });
        });

        dispatch({ type: visibleConstants.HIDE_ALL });

    }
}

export function fileSave() {
    return (dispatch, getState) => {
        const { documents, tree, file } = getState();

        if (!file) {
            throw new Error("No file has been loaded yet");
        }

        const { fileId, title } = file;

        const content = JSON.stringify({ documents: documents, documentTree: tree });

        return GoogleDriveService.save(fileId, title, content);
    }
}

