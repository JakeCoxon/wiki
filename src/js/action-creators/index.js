import _ from 'lodash'
import GoogleDriveService from '../services/google-drive-service.js'

export * from './file.js'

let maxId = -1;
export function documentFreshInsert(title, body) {
    const newId = ++maxId;
    return {
        type: "DOC/INSERT",
        id: newId,
        title,
        body
    }
}

export function documentInsert(id, title, body) {
    maxId = Math.max(maxId, id);
    return {
        type: "DOC/INSERT",
        id,
        title,
        body
    }
}


export function documentOpenLinkAfter(visibleId, documentTitle) {
    documentTitle = documentTitle.toLowerCase();
    return (dispatch, getState) => {
        const { documents, visible } = getState();
        let document = _.find(documents, (doc) => doc.title.toLowerCase() === documentTitle);

        if (!document) {
            document = dispatch(documentFreshInsert(documentTitle, ""));
        }

        dispatch(visibleAddAt(document.id, visibleId + 1))
    }
}

export function visibleAddAt(documentId, visibleId) {
    return {
        type: "VISIBLE/SHOW_AT",
        documentId,
        visibleId
    }
}