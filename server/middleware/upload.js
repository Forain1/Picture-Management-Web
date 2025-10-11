import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import {v4 as uuidv4} from "uuid";


const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        //req为http请求体
        //file为multer处理后的文件信息
        //cb为调用的回调函数, 第一个参数为错误信息, 第二个参数为存储路径

        const userid = req.user.userid;//经过authtoken中间件处理后, req.user中会有userid
        const userDir = path.join(__dirname,"../uploads",userid);
        //判断用户目录是否存在, 若不存在则创建
        if(!fs.existsSync(userDir)){
            fs.mkdirSync(userDir,{recursive:true});
        }
        cb(null,userDir);
    },
    filename: (req,file,cb)=>{
        const ext = path.extname(file.originalname);//取出文件后缀名
        const filename = uuidv4() + ext;//用uuid生成唯一文件名
        cb(null,filename);//回调函数, 第一个参数为错误信息, 第二个参数为文件名
    }
});

const upload = multer({ storage }); // 文件会保存到 storage 配置的路径


export default upload; 

