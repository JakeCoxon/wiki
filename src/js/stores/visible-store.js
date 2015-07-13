import Hoverboard from 'hoverboard'
import removeAt from '../util/removeAt.js'

export default Hoverboard({

    getInitialState() {
        return { visible: [] };
    },

    onShow(documentId) {
        // todo: check currently visible?
        this.setState({ visible: [documentId].concat(this.state.visible) });
    },

    onHide(index) {
        this.setState({ visible: removeAt(this.state.visible, index) })
    },

    onHideAll() {
        this.setState({ visible: [] });
    }

});