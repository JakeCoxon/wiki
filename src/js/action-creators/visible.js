import * as visibleConstants from '../reducers/visible.js'

export function visibleShowAt(documentId, visibleId) {
    return {
        type: visibleConstants.SHOW_AT,
        documentId,
        visibleId
    }
}
export function visibleHideIndex(visibleId) {
    return { type: "VISIBLE/HIDE_INDEX", index: visibleId }
}

export function visibleShow(documentId) {
    return { type: "VISIBLE/SHOW", documentId };
}

export function visibleToggle(documentId) {
    return { type: "VISIBLE/TOGGLE", documentId };
}

export function visibleHideAll() {
    return { type: "VISIBLE/HIDE_ALL" };
}