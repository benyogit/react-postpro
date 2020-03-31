const AWS = require("aws-sdk");

const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID, 
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY, 
    region : "eu-central-1"

});

module.exports = s3;