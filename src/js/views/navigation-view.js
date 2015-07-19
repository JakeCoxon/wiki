import React from 'react'
import AllDocsPanel from '../views/all-docs-panel.js'
import FileMenuView from '../views/file-menu-view.js'
import TreeView from '../views/tree-view.js'

const TabView = React.createClass({
    getInitialState() {
        return { tabIndex: 0 };
    },

    onChangeTab(index) {
        return () => this.setState({ tabIndex: index });
    },

    render() {
        return (
            <div>
                {this.props.children({ 
                    tabIndex: this.state.tabIndex, 
                    onChangeTab: this.onChangeTab
                })}
            </div>
        );
    }
});

const NavigationView = React.createClass({
    render() {


        return (
            <TabView>
                { ({ tabIndex, onChangeTab }) => {
                    const menuButton = (icon, index) =>
                        <a onClick={onChangeTab(index)} 
                           className={`iconbutton ${tabIndex === index ? "is-active" : ""}`}>
                              <i className={`fa ${icon}`}></i>
                        </a>

                    return (
                        <div className="navigationview">
                            <div className="navigationview-menu">
                                {[menuButton('fa-building', 0), 
                                  menuButton('fa-list', 1), 
                                  menuButton('fa-cloud', 2), 
                                  menuButton('fa-cog', 3)]}
                            </div>
                            {(tabIndex === 0) ? <TreeView folderId="root" /> :
                             (tabIndex === 1) ? <AllDocsPanel /> :
                             (tabIndex === 2) ? <FileMenuView /> : null}
                        </div>
                    );
                } }
            </TabView>
        );
        
    }
});

export default NavigationView;