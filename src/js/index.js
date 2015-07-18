require('object.assign').shim();

import React from 'react'
import Hoverboard from 'hoverboard'
import removeAt from './util/removeAt.js'

import AllDocsPanel from './views/all-docs-panel.js'
import TreeView from './views/tree-view.js'
import VisiblePanel from './views/visible-panel.js'
import FileMenuView from './views/file-menu-view.js'

import DocStore from './stores/doc-store.js'
import TreeStore from './stores/tree-store.js'
import FileStore from './stores/file-store.js'

import GoogleDriveService from './services/google-drive-service.js'
import DocumentService from './services/document-service.js'
import FileSavingService from './services/file-saving-service.js'



window.addEventListener('load', load);



function load() {


    GoogleDriveService.init();
    DocumentService.init();
    FileSavingService.init();
    
    FileStore.getState(state => {
        if (state.content) {
            console.log("Loaded File");
            console.log("File content", state.content);
            DocStore.setData(state.content);
            TreeStore.setData(state.content);
        }
    });

    FileStore.loadFile();

    const root = (
        <div>
            <div className="layout">
                <div className="layout-main">
                    <VisiblePanel />
                </div>
                <div className="layout-nav">
                    <FileMenuView />
                    {/*<AllDocsPanel />*/}
                    <TreeView folderId="root" />
                </div>
            </div>
        </div>
    );


    React.render(
      root,
      document.querySelector('.container')
    );

}
