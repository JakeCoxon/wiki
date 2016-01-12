import React from 'react'
import VisibleDocsPanel from '../views/visible-docs-panel.js'
import FileMenuView from '../views/file-menu-view.js'
import TreeView from '../views/tree-view.js'
import TabView from '../views/tab-view.js'
import AllDocsView from '../views/all-docs-view.js'

import { connect } from 'react-redux'

import cx from '../util/mergeClasses.js'

[
    { documentId: 0, title: "sdfasdf" },
    { documentId: 1, title: "sdfasdf",
        children: [
            { documentId: 2, title: "sdfasdf" }
        ] }
]

const TagPanelUnderlying = ({ tag, documents, tags }) => {
    const makeChildren = (tag) => 
        (tags.references[tag] || []).map(documentId => ({
            documentId: documentId,
            title: documents[documentId].title,
            children: makeChildren(documents[documentId].title)
        }))
    return <TreeView children={makeChildren(tag)} />
}
const TagPanel = connect(state => ({ documents: state.documents, tags: state.tags }))(TagPanelUnderlying);


const NavigationView = React.createClass({

    changeTab(idx) {
        this.refs.tabView.changeTab(idx);
    },

    render() {


        return (
            <TabView initialTabIndex={1} ref="tabView">
                { ({ tabIndex }) => {
                    const menuButton = (icon, index) =>
                        <a key={index} onClick={() => this.changeTab(index)} 
                           className={cx("iconbutton", tabIndex === index && "is-active")}>
                              <i className={`fa ${icon}`}></i>
                        </a>

                    return (
                        <div className="navigationview">
                            <div className="navigationview-menu">
                                <div>
                                  {[/*menuButton('fa-building', 0), */
                                    menuButton('fa-building', 1), 
                                    menuButton('fa-list', 2), 
                                    menuButton('fa-cloud', 3), 
                                    menuButton('fa-cog', 4)]}
                                </div>
                                <span className="navigationview-menu-label">{["All", "Contents", "Opened", "Syncing Options", "Settings"][tabIndex]}</span>
                            </div>
                            {(tabIndex === 0) ? <AllDocsView /> :
                             (tabIndex === 1) ? <TagPanel tag="TableOfContents" /> :
                             (tabIndex === 2) ? <VisibleDocsPanel /> :
                             (tabIndex === 3) ? <FileMenuView /> : null}
                        </div>
                    );
                } }
            </TabView>
        );
        
    }
});

export default NavigationView;