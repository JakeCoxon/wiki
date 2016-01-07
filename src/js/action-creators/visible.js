import * as visibleConstants from '../reducers/visible.js'

export function visibleShowAt(documentId, visibleId) {
    return {
        type: visibleConstants.SHOW_AT,
        documentId,
        visibleId
    }
}
export function visibleHideIndex(visibleId) {
    return { type: visibleConstants.HIDE_INDEX, index: visibleId }
}

export function visibleShow(documentId) {
    return { type: visibleConstants.SHOW, documentId };
}

export function visibleToggle(documentId) {
    return { type: visibleConstants.TOGGLE, documentId };
}

export function visibleHideAll() {
    return { type: visibleConstants.HIDE_ALL };
}