import Hoverboard from 'hoverboard'
import removeAt from '../util/removeAt.js'

export default Hoverboard({

    getInitialState() {
        return { visible: [] };
    },

    onToggle(documentId) {
        documentId = Number(documentId);
        const index = this.state.visible.indexOf(documentId);
        if (index === -1)
            this.setState({ visible: [documentId].concat(this.state.visible) });
        else
            this.setState({ visible: removeAt(this.state.visible, index) });
    },

    onShow(documentId) {
        documentId = Number(documentId);
        const index = this.state.visible.indexOf(documentId);
        if (index == -1)
            this.setState({ visible: [documentId].concat(this.state.visible) });
    },

    onHideDocument(documentId) {
        documentId = Number(documentId);
        const index = this.state.visible.indexOf(documentId);
        if (index > -1)
            this.setState({ visible: removeAt(this.state.visible, index) });
    },

    onHide(index) {
        this.setState({ visible: removeAt(this.state.visible, index) })
    },

    onHideAll() {
        this.setState({ visible: [] });
    }

});