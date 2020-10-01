import dotenv from 'dotenv';


export default {
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/api/storeProducts',
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb'
}