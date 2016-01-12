import { visibleShowAt, tagsUpdate } from './index.js'
import * as documentsConstants from '../reducers/documents.js'

const findByTitle = (documents, title) => _.find(documents, (doc) => doc.title.toLowerCase() === title);


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
    return { type: documentsConstants.REMOVE, id }
}

export function documentUpdate(id, title, body) {
    return { type: documentsConstants.UPDATE, id, title, body };
}

export function documentOpenLinkAfter(visibleId, documentTitle) {
    return (dispatch, getState) => {
        const { documents, visible } = getState();
        let document = findByTitle(documents, documentTitle.toLowerCase());

        if (!document) {
            document = dispatch(documentFreshInsert(documentTitle, ""));
        }

        dispatch(visibleShowAt(document.id, visibleId + 1))
    }
}