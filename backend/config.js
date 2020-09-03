import dotenv from 'dotenv';


export default {
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/api/storeProducts'
}