import Hoverboard from 'hoverboard'

import FileHistoryStore from '../stores/file-history-store.js'

export default Hoverboard({

    getInitialState() {
        // const fileId = localStorage.getItem("fileId");
        // if (fileId) console.log("Remembered last file", fileId);
        return { fileId: null, title: null, content: null };
    },

    onFileHasLoaded(fileData) {
        console.log("File Loaded", fileData)

        setTimeout(() => FileHistoryStore.addFileToHistory(fileData.id, fileData.title), 500);

        this.setState({ 
            fileId: fileData.id,
            title: fileData.title,
            content: {
                documents: fileData.content.documents,
                documentTree: fileData.content.documentTree,
            }
        })
    },

    

});