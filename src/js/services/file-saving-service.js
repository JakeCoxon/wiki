import GoogleDriveService from '../services/google-drive-service.js'
import FileStore from '../stores/file-store.js'
import DocStore from '../stores/doc-store.js'
import TreeStore from '../stores/tree-store.js'


const service = {

    state: { fileId: null, title: null, 
             documents: [], 
             root: null, folderTree: {}, documentTree: {},
             error: null },

    init() {

        if (this.initialized) return;
        this.initialized = true;

        FileStore.getState(({ fileId, title }) => {
            this.state = Object.assign({}, this.state, { fileId, title });
        });

        DocStore.getState(({ documents }) => {
            this.state = Object.assign({}, this.state, { documents });
        })

        TreeStore.getState(({ root, folderTree, documentTree }) => {
            this.state = Object.assign({}, this.state, { root, folderTree, documentTree });
        })

    },

    saveFile() {
        if (this.state.fileId === null) {
            throw new Error("No file has been loaded yet");
        }

        const { fileId, title, root, documents, folderTree, documentTree } = this.state;

        const content = JSON.stringify({ root, documents, folderTree, documentTree });

        // const content = `{
        //         "root":{
        //            "id":0,
        //            "name":"THE ROOT OF EVERYTHING"
        //         },
        //         "documents":{
        //            "0":{
        //               "id":0,
        //               "title":"example 1",
        //               "body":"This is some really kick ass stuff"
        //            },
        //            "1":{
        //               "id":1,
        //               "title":"example 2",
        //               "body":"THis is some stuff about stuff"
        //            },
        //            "2":{
        //               "id":2,
        //               "title":"I aint no example",
        //               "body":"THis is some stuff about stuff"
        //            },
        //            "3":{
        //               "id":3,
        //               "title":"example 4",
        //               "body":"THis is some stuff about stuff"
        //            }
        //         },
        //         "folderTree":{
        //            "0":[
        //               {
        //                  "id":1,
        //                  "name":"asd"
        //               },
        //               {
        //                  "id":2,
        //                  "name":"stuff"
        //               }
        //            ],
        //            "1":[
        //               {
        //                  "id":3,
        //                  "name":"sub folder"
        //               }
        //            ]
        //         },
        //         "documentTree":{
        //            "1":[0,1],
        //            "2":[2],
        //            "3":[3]
        //         }
        //     }`


        return GoogleDriveService.save(fileId, title, content);
    }


};

export default service;