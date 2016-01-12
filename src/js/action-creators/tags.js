import * as tagConstants from '../reducers/tags.js'

const findByTitle = (documents, title) => _.find(documents, (doc) => doc.title.toLowerCase() === title);

export function tagsUpdate(documentId, tags) {
    return (dispatch, getState) => {
        const { documents } = getState();

        dispatch({ type: tagConstants.UPDATE, documentId, tags })
    }
}