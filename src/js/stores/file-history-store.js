import Hoverboard from 'hoverboard'

export default Hoverboard({

    getInitialState() {
        const historyString = window.localStorage.getItem('fileHistory');
        const history = historyString ? JSON.parse(historyString) : [];
        console.log(history);
        return { history };
    },

    onAddFileToHistory(fileId, title) {
        const filtered = this.state.history.filter(his => his.fileId !== fileId);
        const history = [{ fileId, title }].concat(filtered.slice(0, 4));
        window.localStorage.setItem('fileHistory', JSON.stringify(history));
        this.setState({ history });
    },


});