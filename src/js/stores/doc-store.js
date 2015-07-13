import Hoverboard from 'hoverboard'

export default Hoverboard({

    getInitialState() {
        return { documents: {} };
    },

    onSetDocuments(documents) {
        this.setState({ documents: documents });
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