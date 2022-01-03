import axios from 'axios';
require("dotenv").config();

const FB_API_PAGE_TOKEN = process.env.VUE_APP_FB_API_PAGE_TOKEN;
const FB_PAGE_ID = process.env.VUE_APP_FB_PAGE_ID;

const fbPostPhotoOnPage = async (request, imagen) => {
    let responseFB = undefined;
    imagen  = encodeURIComponent(imagen)
    request = encodeURIComponent(request)
    await axios.post(`https://graph.facebook.com/${FB_PAGE_ID}/photos?url=${imagen}&message=${request}&access_token=${FB_API_PAGE_TOKEN}`)
    .then(response => {
        console.log('response', response);
        console.log('status', response.status);
        responseFB = response.status;
    })
    .catch(error => {
        console.log('error', error.response);
        console.log('status', error.response.status);
        console.log('message', error.response.data.error.message);
        responseFB = error.response.data.error.message;
    });
    return responseFB;
};

const fbPostOnPage = async (request) => {
    let responseFB = undefined;
    request = encodeURIComponent(request)
    await axios.post(`https://graph.facebook.com/${FB_PAGE_ID}/feed?message=${request}&access_token=${FB_API_PAGE_TOKEN}`)
    .then(response => {
        console.log('response', response);
        console.log('status', response.status);
        responseFB = response.status;
    })
    .catch(error => {
        console.log('error', error.response);
        console.log('status', error.response.status);
        console.log('message', error.response.data.error.message);
        responseFB = error.response.data.error.message;
    });
    return responseFB;
};


export default {
    fbPostPhotoOnPage, 
    fbPostOnPage
};