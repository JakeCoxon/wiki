import documents from './documents.js'
import * as documentsConstants from '../reducers/documents.js'

export const UPDATE = "TAGS/UPDATE";

const initialState = {
    tags: {},       // docId -> [string]
    references: {}  // string -> [docId]
};

const removeEmpty = (obj) => _.pick(obj, x => x.length > 0);

function updateReferences(references, toRemove, toAdd, documentId) {

    const removeReference = (references) => {
        const removed0 = toRemove.map((toRemoveTag) => {
            const omittedChildren = _.filter(references[toRemoveTag] || [], x => x != documentId)
            return [toRemoveTag, omittedChildren]
        })
        const removed1 = _.object(removed0);

        return removeEmpty({ ...references, ...removed1 });
    }

    const addReferences = (references) => {
        return {
            ...references,
            ..._.object(toAdd.map((toAddTag) => [toAddTag, [...(references[toAddTag] || []), documentId]]))
        }
    };

    return _.flow(removeReference, addReferences)(references);

}

export default function tagReducer(state = initialState, action) {

    if (action.type === UPDATE) {
        const { documentId, tags } = action;
        
        const currentTags = state.tags[documentId] || [];

        const toAdd = _.difference(tags, currentTags);
        const toRemove = _.difference(currentTags, tags);

        return { 
            tags: removeEmpty({
                ...state.tags,
                [documentId]: tags
            }),
            references: updateReferences(state.references, toRemove, toAdd, documentId)
        }
    }
    
    else if (action.type === documentsConstants.REMOVE_ALL) {
        return initialState;
    }

    return state;

}