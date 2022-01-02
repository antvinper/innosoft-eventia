import axios from 'axios';
require("dotenv").config();

const FB_API_PAGE_TOKEN = process.env.VUE_APP_FB_API_PAGE_TOKEN;
const FB_PAGE_ID = process.env.VUE_APP_FB_PAGE_ID;

const fbPostPhotoOnPage = async (request, imagen) => {
    console.log("imagenon: ", imagen)
    await axios.post(`https://graph.facebook.com/${FB_PAGE_ID}/photos?url=${imagen}&message=${request}&access_token=${FB_API_PAGE_TOKEN}`)
    .then(response => {
        console.log('response', response);
        console.log('status', response.status);
        return response.status;
    }).catch(error => {
        console.log(error.response);
        return error.response.status;
    });
}

const fbPostOnPage = async (request) =>{
    await axios.post(`https://graph.facebook.com/${FB_PAGE_ID}/feed?message=${request}&access_token=${FB_API_PAGE_TOKEN}`)
    .then(response => {
        console.log('response', response.data);
        return response.status;
    }).catch(error => {
        console.log(error.response);
        return error.response.status;
    });
}


export default {
    fbPostPhotoOnPage, 
    fbPostOnPage
};