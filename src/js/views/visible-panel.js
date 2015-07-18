import React from 'react'
import { TransitionSpring } from 'react-motion'

import DocStore from '../stores/doc-store.js'
import VisibleStore from '../stores/visible-store.js'

import DocumentService from '../services/document-service.js'
import DocView from '../views/doc-view.js'



export default React.createClass({

    getInitialState() {
        return { documents: {}, visible: [] };
    },

    componentWillMount() {
        DocStore.getState(state => {
            this.setState({ documents: state.documents })
        });
        VisibleStore.getState(state => {
            this.setState({ visible: state.visible })
        });
    },

    onClose(visibleId) {
        return () => VisibleStore.hide(visibleId);
    },

    onDelete(documentId) {
        return () => DocumentService.deleteDocument(documentId);
    },

    onDone(id) {
        return ({ title, body }) => DocStore.updateDocument(id, { title, body });
    },

    getEndValue() {
        const obj = {};
        this.state.visible.forEach((documentId, visibleId) => {
            const document = this.state.documents[documentId];
            obj[`doc:${documentId}`] = {
                spring: { val: 1 },
                document: document, 
                visibleId: visibleId
            };
        });
        return obj;
    },

    willEnter(key) {
        // const document = this.state.documents[key];
        return {
            spring: { val: 0 },
            document: {
            },
        };
    },

    willLeave(key, endValue, currentValue, currentVelocity) {
        if (currentValue[key].spring.val === 0 && currentVelocity[key].spring.val === 0) {
            // debugger
            return null; // kill component when opacity reaches 0
        }
        return {
            spring: { val: 0 },
            document: currentValue[key].document,
            visibleId: currentValue[key].visibleId
        };
    },

    _getVisibleElements(currentValue) {
        return (
            <div>
            {Object.keys(currentValue).map(key => {
                const { spring, document, visibleId } = currentValue[key];
                const { id: documentId, title, body } = document;

                const x = lerp(spring.val, -100, 0);

                const style = {
                    opacity: Math.min(Math.max(Math.round(spring.val * 100) / 100, 0), 1), 
                    height: spring.val * 278,
                    transform: `translate3d(${x}px, 0, 0)`
                };

                function lerp(x, min, max) {
                    return x * (max-min) + min;
                }


                const innerStyle = {
                    // position: 'absolute',
                }

                return (
                    <div key={documentId} style={style}>
                        <div style={innerStyle}>
                            <DocView 
                                title={title} 
                                body={body} 
                                onClose={this.onClose(visibleId)} 
                                onDone={this.onDone(documentId)}
                                onDelete={this.onDelete(documentId)} />
                        </div>
                    </div>
                );
            })}
            </div>
        );
    },

    render() {
        

        return (
            <TransitionSpring
                endValue={this.getEndValue}
                willEnter={this.willEnter}
                willLeave={this.willLeave}>
                {currentValue => 
                    <div>
                    {this._getVisibleElements(currentValue)}
                    </div>
                }
            </TransitionSpring>
        );
    }
});