import Hoverboard from 'hoverboard'

import GoogleDriveService from '../services/google-drive-service.js'
import FileLoadingStore from '../stores/file-loading-store.js'
import DocStore from '../stores/doc-store.js'
import TreeStore from '../stores/tree-store.js'


export default Hoverboard({

    getInitialState() {

        FileLoadingStore.getState(state => {
            this.setState({ fileId: state.fileId, title: state.title });
        });

        DocStore.getState(state => {
            this.setState({ documents: state.documents });
        })

        TreeStore.getState(state => {
            this.setState({ root: state.root, folderTree: state.subFolders, documentTree: state.subDocuments });
        })

        return { fileId: null, title: null, documents: [], error: null };
    },

    onSaveFile() {
        if (this.state.fileId === null) {
            this.setState({ error: "No file has been loaded yet" });
            return;
        }

        const { fileId, title, root, documents, folderTree, documentTree } = this.state;

        //const content = JSON.stringify({ root, documents, folderTree, documentTree });

        const content = `{"root":{"id":0,"name":"THE ROOT OF EVERYTHING"},"documents":{"0":{"id":0,"title":"example 1","body":"This is some really kick ass stuff"},"1":{"id":1,"title":"example 2","body":"THis is some stuff about stuff"},"2":{"id":2,"title":"I aint no example","body":"THis is some stuff about stuff"},"3":{"id":3,"title":"example 4","body":"THis is some stuff about stuff"}},"folderTree":{"0":[{"id":1,"name":"asd"},{"id":2,"name":"stuff"}],"1":[{"id":3,"name":"sub folder"}]},"documentTree":{"1":[0,1],"2":[2],"3":[3]}}`


        GoogleDriveService.save(fileId, title, content)
            .then(data => data,
                  error => this.setState({ error: error }));
    }


});