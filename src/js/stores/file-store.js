import Hoverboard from 'hoverboard'

import GoogleDriveService from '../services/google-drive-service.js'

export default Hoverboard({

    getInitialState() {

        return { fileId: "0B46NEfAjL1wPR0lOZ0RjaFA2LUk", title: null, content: null, error: null };
    },

    _fileHasLoaded(fileData) {
        console.log("fileData", fileData)
        this.setState({ 
            fileId: fileData.id,
            title: fileData.title,
            content: {
                root: fileData.content.root,
                documents: fileData.content.documents,
                folderTree: fileData.content.folderTree,
                documentTree: fileData.content.documentTree,
            },
            error: null 
        })
    },

    onPickFile() {
        GoogleDriveService.pick()
            .then(this._fileHasLoaded.bind(this),
                  error => this.setState({ error: error }));
    },

    onLoadFile() {

        const fileLoad = this.state.fileId ?
            GoogleDriveService.load(this.state.fileId) :
            GoogleDriveService.pick()

        fileLoad.then(this._fileHasLoaded.bind(this),
                        error => this.setState({ error: error }));

    },

    onLoadExample() {

        const content = {
                "documents":{
                   "0":{
                      "id":0,
                      "title":"Example 1",
                      "body":"This is some really kick ass stuff"
                   },
                   "1":{
                      "id":1,
                      "title":"Example 2",
                      "body":"THis is some stuff about stuff"
                   },
                   "2":{
                      "id":2,
                      "title":"I aint no example",
                      "body":"THis is some stuff about stuff"
                   },
                   "3":{
                      "id":3,
                      "title":"Untitled 1",
                      "body":"THis is some stuff about stuff"
                   },
                   "4":{
                      "id":4,
                      "title":"Untitled 2",
                      "body":"THis is some stuff about stuff"
                   },
                   "5":{
                      "id":5,
                      "title":"Untitled 3",
                      "body":"THis is some stuff about stuff"
                   }
                },
                "documentTree":{
                   "root":[0,1,2],
                   "1":[3,4,5],
                }
            };

        setTimeout(() => {
            this.setState({ 
                fileId: this.state.fileId,
                title: "Example",
                content: {
                    documents: content.documents,
                    documentTree: content.documentTree,
                },
                error: null 
            });
        }, 0);

    }


});