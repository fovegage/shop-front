let baseURL;
//VUE_APP_API = `//${ip}:${port}`
switch (process.env.NODE_ENV) {
    case 'development':
        baseURL = '//127.0.0.1:8000';
        break;
    case 'prev':
        baseURL = '//101.33.32.225:8002';
        break;
    case 'prod':
        baseURL = '//101.33.32.225:8002';
        break;
    default:
        baseURL = '//101.33.32.225:8002';
        break;
}

export default {
    baseURL
}

