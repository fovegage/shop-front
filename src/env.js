let baseURL;
switch (process.env.NODE_ENV) {
    case 'development':
        baseURL = 'http://101.33.32.225:8002';
        break;
    case 'prev':
        baseURL = 'http://101.33.32.225:8002/api';
        break;
    case 'prod':
        baseURL = 'http://101.33.32.225:8002/api';
        break;
    default:
        baseURL = 'http://101.33.32.225:8002/api';
        break;
}

export default {
    baseURL
}