import xhttp from 'xhttp'
import base64 from 'base-64'

const CLIENT_ID = '675576475190-cbg6n9tp2bsrch7fful2a3sfpb771jkd.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/drive';
const DEVELOPER_KEY = "675576475190"

function getAuthHeader() {
    return {
        "Authorization": "Bearer " + gapi.auth.getToken().access_token
    };
}

function auth() {

    const token = gapi.auth.getToken();
    if (token) return Promise.resolve()

    return new Promise((resolve, reject) => {

        gapi.auth.authorize({'client_id': CLIENT_ID, 
                             'scope': SCOPES, 
                             'immediate': true},

            function(authResult) {

                console.log("Authresult", authResult);

                if(!authResult || authResult.error) { reject(authResult.error) }
                else { resolve() }

            });

    });
}

function getMetaData(fileId) {

    return xhttp({
        url: "https://www.googleapis.com/drive/v2/files/" + fileId,
        headers: getAuthHeader(),
        data: {
            key: CLIENT_ID
        },
        type: "plain",
        timeout: 3000
    })
    .catch(function(jqXHR) {

        if (jqXHR.status === 404) { throw new Error("File not found"); }
        throw new Error("Error " + jqXHR.statusText);

    });

}

function getContent(fileMetaData) {

    return xhttp({
        url: fileMetaData.downloadUrl,
        headers: getAuthHeader(),
        type: 'plain',
        data: {
            key: CLIENT_ID
        },
        timeout: 3000
    })
    .then(content => {
        return { ...fileMetaData, content }
    })
    .catch(function(jqXHR) {

        throw new Error("Error " + jqXHR.statusText);

    });

}

function uploadContent(fileId, title, content) {

    console.log(arguments)

    const boundary = 'g6tCnkkDaV4goAki5K7SGQLLbYlp56q7';
    const delimiter   = "\r\n--" + boundary + "\r\n";
    const close_delim = "\r\n--" + boundary + "--";
    const contentType = 'application/json';
    const metadata = {
        title: title,
        mimeType: contentType
    };

    var path = 'upload/drive/v2/files';
    var method = 'POST';
    if (fileId) {
        path += "/" + fileId;
        method = 'PUT';
    }
    path += "?uploadType=multipart"

    const headers = {
        'Content-Type': `multipart/mixed; boundary="${boundary}"`,
        "Authorization": `Bearer ${gapi.auth.getToken().access_token}`
    };

    const base64Data = base64.encode(content);
    const multipartRequestBody = [
        delimiter,
        'Content-Type: application/json\r\n\r\n',
        JSON.stringify(metadata),
        delimiter,
        'Content-Type: ',
        contentType,
        '\r\n',
        'Content-Transfer-Encoding: base64\r\n',
        '\r\n',
        base64Data,
        close_delim
    ].join("");

    return xhttp({
        method: method,
        url: "https://www.googleapis.com/" + path,
        headers: headers,
        data: multipartRequestBody,
        timeout: 3000
    }).catch(function(jqXHR) {

        throw new Error("Error " + jqXHR.statusText);

    });
}

var initialized = false;
function init() {
    if (initialized) return;
    initialized = true;
    window.gapi && gapi.load('picker', {'callback': function() {  }});
}

function openPicker() {

    const onlyPicked = (resolve) => (data) => {
        if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) resolve(data);
    }

    return new Promise((resolve, reject) =>
        new google.picker.PickerBuilder().
                addView(google.picker.ViewId.DOCS).
                addView(google.picker.ViewId.RECENTLY_PICKED).
                addView(google.picker.ViewId.FOLDERS).
                setOAuthToken(gapi.auth.getToken().access_token).
                setAppId(DEVELOPER_KEY).
                setCallback(onlyPicked(resolve)).
                build().
                setVisible(true)
    )
}

function getFileIdFromPickerData(data) {
    var doc = data[google.picker.Response.DOCUMENTS][0];
    return Promise.resolve(doc.id);
}


function pick() {

    return auth()
        .then(openPicker)
        .then(getFileIdFromPickerData)
        .then(getMetaData)
        .then(getContent)

}

function load(fileId) {

    return auth()
        .then(() => getMetaData(fileId))
        .then(getContent);

}

function save(fileId, title, content) {

    return auth()
        .then(() => uploadContent(fileId, title, content));

}


export default {

    load: load,
    pick: pick,
    save: save,
    init: init

    // auth: auth,
    // getMetaData: getMetaData,
    // getContent: getContent,
    // uploadContent: uploadContent,
    // openPicker: openPicker
}

