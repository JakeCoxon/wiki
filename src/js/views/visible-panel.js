import React from 'react'
import Measure from 'react-measure'
import { TransitionMotion, spring } from 'react-motion'

import { documentOpenLinkAfter } from '../action-creators'
import DocView from '../views/doc-view.js'
import * as actions from '../action-creators'

import { connect } from 'react-redux'

const VisiblePanelUnderlying = React.createClass({

    componentWillMount() {
        this.shits = {};
    },

    onClose(visibleId) {
        return () => this.props.dispatch(actions.visibleHideIndex(visibleId));
    },

    onDelete(id) {
        return () => this.props.dispatch(actions.documentRemove(id));
    },

    onDone(id) {
        return ({ title, body }) => this.props.dispatch(actions.documentUpdate(id, title, body));
    },

    onOpenDocument(visibleId) {
        return (documentTitle) => this.props.dispatch(documentOpenLinkAfter(visibleId, documentTitle));
    },

    getEndValue(prevStyles) {
        const obj = {};
        // let toAddShit = 0;
        // const toAdd = {};

        const array = [];
        let index = 0;

        this.props.visible.forEach((documentId, visibleId) => {
            let currentShitId = (this.shits[documentId] || 0);
            const prevDocStyle = prevStyles[`doc:${documentId}:${currentShitId}`];
            const document = this.props.documents[documentId];
            const tags = this.props.tagData.tags[documentId];
            const documentData = {
                document, tags
            }

            if (prevDocStyle && prevDocStyle.leaving && prevDocStyle.visibleId != 0) {

                // toAdd[prevDocStyle.visibleId] = prevDocStyle;
                array[prevDocStyle.visibleId + 1] = {
                    ...prevDocStyle,
                    key: `doc:${documentId}:${currentShitId}`
                }

                currentShitId = this.shits[documentId] = currentShitId + 1;

            }


            //obj[`doc:${documentId}:${currentShitId}`]
            while(array[index]) index ++;

            array[index] = {
                spring: spring(1),
                documentData: documentData, 
                visibleId: visibleId,
                key: `doc:${documentId}:${currentShitId}`
            };

            index ++;

            
        });

        array.forEach(style => {
            obj[style.key] = style;
        });


        return obj;
        

        // if (toAddShit > 0)
        //     return insertAtPositions(obj, toAdd, toAddShit);
        // else return obj;

        // function insertAtPositions(obj, toAdd, num) {
        //     const newObj = {};
        //     obj.forEach((value, key) => {

        //     })
        // }

        // if (toAddShit) {
        //     const prevObj = obj;
        //     obj = {};
        //     Object.keys(prevObj).forEach((key, visibleId) => {
        //         obj[key] = prevObj[key];
        //         if (toAdd[visibleId]) {
        //             console.log("Adding some shit");
        //             const toAddDocumentId = toAdd[visibleId].document.id;
        //             obj[`leaving:${toAddDocumentId}`] = toAdd[visibleId];
        //         }
        //     })
        // }

        return obj;
    },

    willEnter(key, styleOfKey, styles, currentInterpolatedStyle, currentVelocity) {
        return {
            spring: spring(0),
            documentData: styleOfKey.documentData,
            visibleId: styleOfKey.visibleId
        };
    },

    willLeave(key, styleOfKey, styles, currentInterpolatedStyle, currentVelocity) {
        if (styleOfKey.spring.val === 0 && currentVelocity[key].spring.val === 0) {
            // debugger
            return null; // kill component when opacity reaches 0
        }
        return {
            spring: spring(0),
            documentData: styleOfKey.documentData,
            visibleId: styleOfKey.visibleId,
            leaving: true
        };
    },

    getInitialState() {
        return { heights: {} }
    },

    onMeasure(idx, dimensions, ...rest) {
        this.state.heights[idx] = dimensions.height;
        this.setState({ heights: this.state.heights });
    },

    _getVisibleElements(interpolatedStyles) {
        return (
            <div>
            {Object.keys(interpolatedStyles).map((key, idx) => {
                const { spring, documentData, visibleId } = interpolatedStyles[key];
                const { document, tags } = documentData;
                const { id: documentId, title, body } = document;

                const x = lerp(spring, -100, 0);


                const style = {
                    opacity: Math.min(Math.max(Math.round(spring * 100) / 100, 0), 1), 
                    height: spring * ((this.state.heights[key] || 248) + 30),
                    transform: `translate3d(${x}px, 0, 0)`
                };

                function lerp(x, min, max) {
                    return x * (max-min) + min;
                }


                const innerStyle = {
                    // position: 'absolute',
                    // maxHeight: ((this.state.heights[key] || 248) + 30),
                    // overflow: 'hidden'
                }

                return (
                    <div key={key} style={style}>
                        <div style={innerStyle}>
                            <Measure 
                                whitelist={['height']} 
                                config={{subtree: true, childList: true, attributes: true}}
                                onMeasure={(...rest) => this.onMeasure(key, ...rest)}>
                                <DocView 
                                    preferredHeight={this.state.heights[key]}
                                    title={title} 
                                    body={body} 
                                    tags={tags}
                                    onClose={this.onClose(visibleId)} 
                                    onDone={this.onDone(documentId)}
                                    onDelete={this.onDelete(documentId)}
                                    onOpenDocument={this.onOpenDocument(visibleId)} />
                            </Measure>
                        </div>
                    </div>
                );
            })}
            </div>
        );
    },

    render() {
        

        return (
            <TransitionMotion
                styles={this.getEndValue}
                willEnter={this.willEnter}
                willLeave={this.willLeave}>
                {interpolatedStyles => 
                    <div>
                    {this._getVisibleElements(interpolatedStyles)}
                    </div>
                }
            </TransitionMotion>
        );
    }
});

const mapStateToProps = (state) => ({
    visible: state.visible,
    documents: state.documents,
    tagData: state.tags
})
const VisiblePanel = connect(mapStateToProps)(VisiblePanelUnderlying);


export default VisiblePanel;