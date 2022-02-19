const axios = require('axios');

const BASE_URL = 'http://localhost:3100/api/v1/';

function getPosts(filterOptions) {
    return axios.get(BASE_URL + 'posts' + filterOptions)
}

function post(data) {
    return axios.post(BASE_URL + 'posts', data)
}

function getPostsnumber(filterOptions) {
    return axios.get(BASE_URL + 'posts/postsnumber' + filterOptions)
}

function getTopcreators() {
    return axios.get(BASE_URL + 'statistics/topcreators')
}

function getAvgRuntimes() {
    return axios.get(BASE_URL + 'statistics/runtimes')
}

let option = 5;
let data = "";
let promise;
switch (option) {
    case 1: {
        promise = post;
        data = {
            username: "username" + "5",
            title: "title" + "5a",
            body: "body" + "5a",
            subject: "subject" + "5a",
        }
        break;
    }
    case 2: {
        promise = getPosts;
        data = `?username=username2&limit=5`;
        //data = `?start=2022-02-17&end=2022-02-18`;
        break;
    }
    case 3: {
        promise = getPostsnumber;
        data = `?username=username2&limit=5`;
        //data = `?start=2022-02-17&end=2022-02-18`;
        break;
    }
    case 4: promise = getTopcreators; break;
    case 5: promise = getAvgRuntimes; break;
}

promise(data)
    .then(res => {
        console.log(`statusCode: ${res.status}`);
        console.log(res.data);
    })
    .catch(error => {
        console.error(error);
    });
