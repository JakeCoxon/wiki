import React from 'react'
import { connect } from 'react-redux'
import { documentFreshInsert } from '../action-creators'

const AllDocsViewUnderlying = ({ documents, dispatch }) => {
    const onToggle = (docId) => dispatch({ type: "VISIBLE/TOGGLE", documentId: docId });
    const onNew = () => {
        const { id } = dispatch(documentFreshInsert("New document", ""));
        dispatch({ type: "VISIBLE/SHOW", documentId: id })
    }

    const sorted = _.sortBy(documents, (doc) => doc.title.toLowerCase());

    return <div>

        <button onClick={onNew}>New</button><br />
            {_.map(sorted, ({ id: docId, title }) => 
                <div key={docId} className="listitem" onClick={() => onToggle(docId)}>
                    <div className="doclink">{ title }</div>
                </div>
            )}
    </div>
}

const mapStateToProps = (state) => ({ documents: state.documents });
export default connect(mapStateToProps)(AllDocsViewUnderlying);