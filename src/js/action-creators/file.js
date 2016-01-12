import GoogleDriveService from '../services/google-drive-service'
import { documentInsert, tagsUpdate, fileHistoryAdd } from './index.js'
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

        dispatch({ type: fileConstants.SET_STATE, fileId: id, title });
        dispatch(fileHistoryAdd(title, id));

        dispatch({ type: documentsConstants.REMOVE_ALL });

        _.forEach(content.documents, (document) => {
            const { id, title, body } = document;
            dispatch(documentInsert(id, title, body));
        });

        _.forEach(content.documents, (document) => {
            const { id, tags } = document;
            dispatch(tagsUpdate(id, tags || []));
        });

        dispatch({ type: visibleConstants.HIDE_ALL });

    }
}

export function fileNew() {
    const title = prompt("New name to store in Google Drive");
    if (!title || title.split(/\s*/).join("").length === 0) return;

    return fileLoadSuccess({ 
        id: undefined,
        title: title,
        content: {
            documents: {
                0: {
                    id: 0,
                    title: "Home",
                    body: "",
                    tags: ['TableOfContents']
                }
            }
        }
    })
}

export function fileSave() {
    return (dispatch, getState) => {
        const { documents, file, tags } = getState();

        if (!file) {
            throw new Error("No file has been loaded yet");
        }

        const { fileId, title } = file;

        const documentsWithTags = _.mapValues(documents, (document) => {
            return {
                ...document,
                tags: tags.tags[document.id]
            }
        });

        const content = JSON.stringify({ documents: documentsWithTags });

        const promise = GoogleDriveService.save(fileId, title, content);

        promise.then((data) => {
            const { id: fileId, title } = data;
            dispatch({ type: fileConstants.SET_STATE, fileId, title });

            dispatch(fileHistoryAdd(title, fileId));
        })
    }
}

