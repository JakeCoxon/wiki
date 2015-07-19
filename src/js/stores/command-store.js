import Hoverboard from 'hoverboard'

export default Hoverboard({

    getInitialState() {
        return { commands: [] };
    },

    onShow(commands, target) {
        const targetRect = target && target.getBoundingClientRect()
        this.setState({ commands, targetRect });
    },

    onHide() {
        this.setState({ commands: [] });
    }

});