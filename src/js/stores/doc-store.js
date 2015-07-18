import Hoverboard from 'hoverboard'

export default Hoverboard({

    getInitialState() {
        return { documents: {} };
    },

    onSetData({ documents }) {
        this.setState({ documents });
    },

    onUpdateDocument(id, { title, body }) {
        const newDocument = Object.assign({}, this.state.documents[id], { title, body });
        this.setState({
            documents: Object.assign({}, this.state.documents, { [id]: newDocument } )
        });
    },

    onRemoveDocument(id) {
        const newDocuments = Object.assign({}, this.state.documents);
        delete newDocuments[id];
        this.setState({ documents: newDocuments });
    },

    onInsert(document) {
        const newDocuments = Object.assign(
            {}, 
            this.state.documents, 
            { [document.id]: document }
        );

        this.setState({ documents: newDocuments });
    }

});