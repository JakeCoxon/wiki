require('object.assign').shim();

import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'

import VisiblePanel from './views/visible-panel.js'
import NavigationView from './views/navigation-view.js'

import GoogleDriveService from './services/google-drive-service.js'
import * as actions from './action-creators'

import reducer from './reducers/index.js'
import { Provider } from 'react-redux'

require('codemirror/lib/codemirror.css');

const logger = store => next => action => {
    console.groupCollapsed(action.type)
    console.info('dispatching', action)

    const result = next(action)

    console.log('next state', store.getState())
    console.groupEnd(action.type)
    return result
}

const store = window.store = applyMiddleware(
    require('redux-thunk'),
    logger
)(createStore)(reducer);


window.addEventListener('load', load);


import Editor from './views/editor-view.js'

function load() {

    GoogleDriveService.init();

    store.dispatch(actions.fileHistoryLoad());

    const data = require('./debug-data.js').debugFile;
    const promise = store.dispatch(actions.fileLoadData(data));

    promise.then((data) => {

        store.dispatch({ type: "TAGS/UPDATE", documentId: 2, tags: ['TableOfContents'] })
        store.dispatch({ type: "TAGS/UPDATE", documentId: 3, tags: ['TableOfContents'] })
        store.dispatch({ type: "TAGS/UPDATE", documentId: 0, tags: ['TiddlyWiki'] })
        store.dispatch({ type: "TAGS/UPDATE", documentId: 1, tags: ['Markdown example'] })


        const allDocuments = store.getState().documents
        const homeDoc = _.find(allDocuments, doc => doc.title.toLowerCase() == 'home');
        if (homeDoc) {
            store.dispatch(actions.visibleShow(homeDoc.id))
        }
    })

    const root = (
        <Provider store={store}>
            <div>
                {/*<CommandView.Adapter />*/}

                <div className="layout">
                    <div className="layout-main">
                        
                        <VisiblePanel />
                    </div>
                    <div className="layout-nav">
                        <NavigationView />
                    </div>
                </div>
            </div>
        </Provider>
    );


    ReactDOM.render(
      root,
      document.querySelector('.container')
    );

}
