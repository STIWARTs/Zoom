let IS_PROD = true;
const server = IS_PROD ?
    "https://zoombackend.onrender.com" :

    "http://localhost:8000"


export default server;