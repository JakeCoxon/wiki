
var docId = 0;
export function Doc(id, title, body) {
    if (id === undefined) id = docId++;
    return { id, title, body }
}

var folderId = 0;
export function Folder(id, name) {
    if (id === undefined) id = folderId++;
    return { id, name }
}
