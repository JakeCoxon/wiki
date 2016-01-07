import { visibleShowAt } from './index.js'
import * as documentsConstants from '../reducers/documents.js'

let maxId = -1;
export function documentFreshInsert(title, body) {
    const newId = ++maxId;
    return {
        type: documentsConstants.INSERT,
        id: newId,
        title,
        body
    }
}

export function documentInsert(id, title, body) {
    maxId = Math.max(maxId, id);
    return {
        type: documentsConstants.INSERT,
        id,
        title,
        body
    }
}

export function documentRemove(id) {
    return { type: "DOC/REMOVE", id }
}

export function documentUpdate(id, title, body) {
    return { type: "DOC/UPDATE", id, title, body };
}

export function documentOpenLinkAfter(visibleId, documentTitle) {
    documentTitle = documentTitle.toLowerCase();
    return (dispatch, getState) => {
        const { documents, visible } = getState();
        let document = _.find(documents, (doc) => doc.title.toLowerCase() === documentTitle);

        if (!document) {
            document = dispatch(documentFreshInsert(documentTitle, ""));
        }

        dispatch(visibleShowAt(document.id, visibleId + 1))
    }
}