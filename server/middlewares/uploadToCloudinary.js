import { v2 as cloudinary } from 'cloudinary';

const uploadToCloudinary = async (file) => {
   try {
      cloudinary.config({
         cloud_name: 'de6wlh1wh',
         api_key: '652542227352174',
         api_secret: 'WPsx62Cj5qRs2e8TdNCsy9_a_d4',
      });

      const uploadedImage = await cloudinary.uploader.upload(file.path, {
         folder: 'chatApp',
      });

      return uploadedImage.url;
   } catch (error) {
      console.log(error);
   }
};

export default uploadToCloudinary;
