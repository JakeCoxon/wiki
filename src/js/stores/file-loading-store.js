import Hoverboard from 'hoverboard'

import GoogleDriveService from '../services/google-drive-service.js'

export default Hoverboard({

    getInitialState() {

        GoogleDriveService.setup();

        return { fileId: null, title: null, content: null, error: null };
    },

    onLoadFile() {
        GoogleDriveService.load("0B46NEfAjL1wPR0lOZ0RjaFA2LUk")
            .then(data => 
                this.setState({ 
                    fileId: data.id,
                    title: data.title,
                    content: {
                        root: data.content.root,
                        documents: data.content.documents,
                        folderTree: data.content.folderTree,
                        documentTree: data.content.documentTree,
                    },
                    error: null 
                }),
                error => this.setState({ error: error })
            );
    }


});