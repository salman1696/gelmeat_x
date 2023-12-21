export const getPathFromUrl = (url, type = 'application') => {
    let path = '';

    // https://zisaf-crm-dev-docs.s3.ca-central-1.amazonaws.com/applications/2551/3551/ON_RESERVE_RESIDENCE/UTILITY_BILL/test.png?Content-Type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4OJFBTPBFHLTAT7N%2F20211128%2Fca-central-1%2Fs3%2Faws4_request&X-Amz-Date=20211128T191728Z
    const split = String(url).split('?');
    const splitURl = split[0].toString().trim();
    const index = splitURl.indexOf(type);
    if (index > -1) {
        path = splitURl.substr(index);
    }
    return path;
};

export const getFileName = path => {
    let filename = '';
    const pathArr = String(path).split('/');
    filename = pathArr[pathArr.length - 1];
    return filename;
};

export const getFileExtension = filename => {
    let extension = '';
    const pathArr = String(filename).split('.');
    extension = pathArr[pathArr.length - 1];
    return extension;
};
