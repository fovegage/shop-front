let baseURL;
//VUE_APP_API = `//${ip}:${port}`
switch (process.env.NODE_ENV) {
    case 'development':
        baseURL = '//127.0.0.1:8000';
        break;
    case 'prev':
        baseURL = '//japan.myinterface.cn';
        break;
    case 'prod':
        baseURL = '//japan.myinterface.cn';
        break;
    default:
        baseURL = '//japan.myinterface.cn';
        break;
}

export default {
    baseURL
}

