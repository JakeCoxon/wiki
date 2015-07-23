
import GoogleDriveService from '../services/google-drive-service.js'
import FileStore from '../stores/file-store.js'
import VisibleStore from '../stores/visible-store.js'

const service = {

    init() {

        if (this.initialized) return;
        this.initialized = true;


    },

    loadData(data) {
        return Promise.resolve(data)
            .then(data => FileStore.fileHasLoaded(data))
            .then(() => VisibleStore.hideAll())
            .catch(error => console.error(error));
    },

    pickFile() {
        return this.loadData(GoogleDriveService.pick());
    },


    
    loadFile(fileId) {
        return this.loadData(GoogleDriveService.load(fileId));
    },

    loadDebug() {

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

        const fileData = { 
            id: "0B46NEfAjL1wPR0lOZ0RjaFA2LUk",
            title: "Example",
            content: content
        };


        return this.loadData(fileData);

    }

};

export default service;