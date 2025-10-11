import Photo from "../models/photo.js"
import fs from "fs"
import exifParser from "exif-parser"



export const uploadPhoto = async (req,res) =>{
    try {
        const file = req.file;
        const user = req.user;
        if(!file)return res.status(400).json({message:'没有上传照片'});

        const buffer = fs.readFileSync(file.path);//读取照片内容
        const parser = exifParser.create(buffer);//解析照片的exif信息
        const parseRes = parser.parse();//解析出来的exif信息
       // console.log(parseRes);
        const photoInfo = {
            userid:user.userid,
            originalName: file.originalname,
            fileName: file.filename,
            path: file.path,
            size: file.size,
            resolution: {
                width: parseRes.imageSize.width || null,
                height: parseRes.imageSize.height || null
            },
            dateTime: parseRes.tags.DateTimeOriginal || null,
            gps: (parseRes.tags.GPSLatitude && parseRes.tags.GPSLongitude)
                    ? { lat: parseRes.tags.GPSLatitude, lng: parseRes.tags.GPSLongitude }
                    : null,
            camera: (parseRes.tags.Make && parseRes.tags.Model) ? `${parseRes.tags.Make} ${parseRes.tags.Model}` : null
        };

        const newPhoto = new Photo(photoInfo);
        await newPhoto.storePhoto();

        res.status(200).json({ message: '上传成功', photo: photoInfo });

    } catch (error) {
        console.error(error);
            try {
                if(req.file.path)fs.unlinkSync(req.file.path);//删除已上传的文件
                console.log('已删除上传失败的文件');
            } catch (error) {
                console.error('删除上传失败的文件时出错:', error);
            }
        res.status(500).json({ message: '上传失败', error: error.message });
    }

}