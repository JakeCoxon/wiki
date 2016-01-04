import React from 'react'
import VisibleDocsPanel from '../views/visible-docs-panel.js'
import FileMenuView from '../views/file-menu-view.js'
import TreeView from '../views/tree-view.js'
import TabView from '../views/tab-view.js'

import cx from '../util/mergeClasses.js'



const NavigationView = React.createClass({
    render() {


        return (
            <TabView initialTabIndex={2}>
                { ({ tabIndex, onChangeTab }) => {
                    const menuButton = (icon, index) =>
                        <a key={index} onClick={onChangeTab(index)} 
                           className={cx("iconbutton", tabIndex === index && "is-active")}>
                              <i className={`fa ${icon}`}></i>
                        </a>

                    return (
                        <div className="navigationview">
                            <div className="navigationview-menu">
                                <div>
                                  {[menuButton('fa-building', 0), 
                                    menuButton('fa-list', 1), 
                                    menuButton('fa-cloud', 2), 
                                    menuButton('fa-cog', 3)]}
                                </div>
                                <span className="navigationview-menu-label">{["All", "Visible", "Syncing", "Options"][tabIndex]}</span>
                            </div>
                            {(tabIndex === 0) ? <TreeView folderId="root" /> :
                             (tabIndex === 1) ? <VisibleDocsPanel /> :
                             (tabIndex === 2) ? <FileMenuView onDone={onChangeTab(0)}/> : null}
                        </div>
                    );
                } }
            </TabView>
        );
        
    }
});

export default NavigationView;