import Photo from "../models/photo.js"
import fs from "fs"
import exifParser from "exif-parser"
import path from "path"
import { fileURLToPath } from "url";


//用户上传照片 自动解析exif信息
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


export const uploadTag = async(req,res) =>{
    try {
        const user = req.user;
        const {tag} = req.body;
        if(!tag||tag.trim()==='')return res.status(400).json({message:'标签不能为空'});
        await Photo.storeTag(user.userid,tag.trim().toLowerCase());
        res.status(200).json({message:'上传标签成功'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'上传标签失败',error:error.message});
    }
}

export const addTagToPhoto = async(req,res) =>{
    try {
        const user = req.user;
        const {photoid,tag} = req.body;
        await Photo.addTagToPhoto(user.userid,photoid,tag);
        res.status(200).json({message:'添加标签成功'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'添加标签失败',error:error.message});
    }
}


export const removeTagFromPhoto = async(req,res)=>{
    try {
        const user = req.user;
        const {photoid,tag} = req.body;
        await Photo.removeTagFromPhoto(user.userid,photoid,tag);
        res.status(200).json({message:'删除照片标签成功'});
    } catch (error) {
        console.error(error);
        res.status(500).json({msssage:'删除照片标签失败',error:error.message});
    }
}



//这里需要后续做排序,根据tag来返回需要的url,通过photo类进行完善
export const getPhotoUrls = async(req,res) =>{
    try {
        const user = req.user;
        const photoUrls = await Photo.getPhotoUrls(user.userid);
        res.status(200).json({photoUrls});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'获取照片列表失败',error:error.message});
    }
}

//获取该用户的全部标签
export const getAllTags = async(req,res) =>{
    try {
        const user = req.user;
        const tags = await Photo.getAllTags(user.userid);
        res.status(200).json({tags});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'获取标签失败',error:error.message}); 
    }
}



//单纯的发送照片文件
export const sendPhoto = (req, res) => {
  // 从 req.params 获取路径参数
  const { filename } = req.params;
  const userid = req.user.userid;

    // 当前文件的绝对路径
    const __filename = fileURLToPath(import.meta.url);
    // 当前文件夹
    const __dirname = path.dirname(__filename);

    // 构建绝对路径
    const filePath = path.join(__dirname, "../uploads", userid, filename);
    // 文件存在检查
    if (!fs.existsSync(filePath)) {
        return res.status(404).send("图片不存在");
    }

    // 返回文件给浏览器
    res.status(200).sendFile(filePath);
};

