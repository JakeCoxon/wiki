import React from 'react'
import VisibleDocsPanel from '../views/visible-docs-panel.js'
import FileMenuView from '../views/file-menu-view.js'
import TreeView from '../views/tree-view.js'
import TabView from '../views/tab-view.js'
import AllDocsView from '../views/all-docs-view.js'

import cx from '../util/mergeClasses.js'



const NavigationView = React.createClass({

    changeTab(idx) {
        this.refs.tabView.changeTab(idx);
    },

    render() {


        return (
            <TabView initialTabIndex={0} ref="tabView">
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
                                  {[menuButton('fa-building', 0), 
                                    menuButton('fa-list', 1), 
                                    menuButton('fa-cloud', 2), 
                                    menuButton('fa-cog', 3)]}
                                </div>
                                <span className="navigationview-menu-label">{["All", "Opened", "Syncing Options", "Settings"][tabIndex]}</span>
                            </div>
                            {(tabIndex === 0) ? <AllDocsView /> :
                             (tabIndex === 1) ? <VisibleDocsPanel /> :
                             (tabIndex === 2) ? <FileMenuView /> : null}
                        </div>
                    );
                } }
            </TabView>
        );
        
    }
});

export default NavigationView;