require('object.assign').shim();

import React from 'react'
import Hoverboard from 'hoverboard'
import removeAt from './util/removeAt.js'

import TreeView from './views/tree-view.js'
import VisiblePanel from './views/visible-panel.js'
import NavigationView from './views/navigation-view.js'
import CommandView from './views/command-view.js'

import DocStore from './stores/doc-store.js'
import TreeStore from './stores/tree-store.js'
import FileStore from './stores/file-store.js'
import CommandStore from './stores/command-store.js'

import GoogleDriveService from './services/google-drive-service.js'
import DocumentService from './services/document-service.js'
import FileSavingService from './services/file-saving-service.js'
import AutoSaveService from './services/auto-save-service.js'



window.addEventListener('load', load);



function load() {


    GoogleDriveService.init();
    DocumentService.init();
    FileSavingService.init();
    AutoSaveService.init();
    
    FileStore.getState(state => {
        if (state.content) {
            setTimeout(() => {

                console.log("Loaded File");
                console.log("File content", state.content);
                DocStore.setData(state.content);
                TreeStore.setData(state.content);

            }, 10);

        }
    });

    const root = (
        <div>
            <CommandView.Adapter />

            <div className="layout">
                <div className="layout-main">
                    
                    <VisiblePanel />
                </div>
                <div className="layout-nav">
                    <NavigationView />
                </div>
            </div>
        </div>
    );


    React.render(
      root,
      document.querySelector('.container')
    );

}
