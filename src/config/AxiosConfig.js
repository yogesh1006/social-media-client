import axios from "axios";


(function (axios) {
    axios.interceptors.request.use(function (req) {
        if(req.url.includes('api')){
        req.headers.authorization = localStorage.getItem('token');
        }
        return req
    }, function (error) {
        // Do something with
        return Promise.reject(error);
    });
})(axios);