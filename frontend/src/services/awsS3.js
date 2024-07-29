import s3 from '../config/awsConfig';

export const uploadImage = (file) => {
  const params = {
    Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
    Key: file.name,
    Body: file,
    // ACL: 'public-read'
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Location);
      }
    });
  });
};
