import docReducer from './documents.js'
import treeReducer from './tree.js'
import visibleReducer from './visible.js'
import fileReducer from './file.js'
import fileHistoryReducer from './file-history.js'

export default function reducer(state = {}, action) {
    return { 
        documents: docReducer(state.documents, action),
        tree: treeReducer(state.tree, action),
        visible: visibleReducer(state.visible, action),
        file: fileReducer(state.file, action),
        fileHistory: fileHistoryReducer(state.fileHistory, action)
    };
}


