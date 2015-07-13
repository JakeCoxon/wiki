import React from 'react'
import Hoverboard from 'hoverboard'
import removeAt from './util/removeAt.js'

import AllDocsPanel from './views/all-docs-panel.js'
import TreePanel from './views/tree-panel.js'
import VisiblePanel from './views/visible-panel.js'
import FileView from './views/file-view.js'

import DocStore from './stores/doc-store.js'
import TreeStore from './stores/tree-store.js'

import GoogleDriveService from './services/google-drive-service.js'
import FileLoadingStore from './stores/file-loading-store.js'
import FileSavingStore from './stores/file-saving-store.js'


require('object.assign').shim();


window.addEventListener('load', load);





var docId = 0;
function Doc(id, title, body) {
    return { id, title, body }
}

var folderId = 0;
function Folder(id, name) {
    return { id, name }
}

const a = Doc(docId++, "example 1", "THis is some stuff about stuff");
const b = Doc(docId++, "example 2", "THis is some stuff about stuff");
const c = Doc(docId++, "example 3", "THis is some stuff about stuff");
const d = Doc(docId++, "example 4", "THis is some stuff about stuff");

DocStore.insert(a);
DocStore.insert(b);
DocStore.insert(c);
DocStore.insert(d);

const root = Folder(folderId++, "root");
const folder1 = Folder(folderId++, "asd");
const folder2 = Folder(folderId++, "stuff");
const folder3 = Folder(folderId++, "sub folder");

TreeStore.setRoot(root)

TreeStore.addFolderChild(root.id, folder1)
TreeStore.addFolderChild(root.id, folder2)
TreeStore.addFolderChild(folder1.id, folder3)

TreeStore.addDocumentChild(folder1.id, a.id)
TreeStore.addDocumentChild(folder1.id, b.id)
TreeStore.addDocumentChild(folder2.id, c.id)
TreeStore.addDocumentChild(folder3.id, d.id)




function load() {
    
    FileLoadingStore.getState(state => {
        if (state.content) {
            console.log(state.content.documents);
            DocStore.setDocuments(state.content.documents);
        }
    });

    const root = (
        <div>
            <FileView />
            <AllDocsPanel />
            <TreePanel />
            <VisiblePanel />
        </div>
    );


    React.render(
      root,
      document.querySelector('.container')
    );

}
