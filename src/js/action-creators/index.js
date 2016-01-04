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