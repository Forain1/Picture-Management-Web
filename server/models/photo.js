import pool from "../db.js";

export default class Photo{
    #userid
    #originalName
    #fileName
    #path
    #size
    #width
    #height
    #dateTime
    #gps    
    #camera
    #uploadTime
    constructor({userid,originalName,fileName,path,size,resolution,dateTime,gps,camera}){
        this.#userid = userid;
        this.#originalName = originalName;
        this.#fileName = fileName;
        this.#path = path;
        this.#size = size;
        this.#width = resolution.width;
        this.#height = resolution.height;
        this.#dateTime = dateTime;
        this.#gps = gps;
        this.#camera = camera;
        this.#uploadTime = new Date().getTime();
    }


    async storePhoto(){
       let connection;
       try {
            connection = await pool.getConnection();
            const [user] = await connection.execute('SELECT id FROM users WHERE userid = ?', [this.#userid]);
           // console.log([this.#userid,this.#originalName,this.#fileName,this.#path,this.#width,this.#height,this.#uploadTime]);
            const sql = 'insert into photos (user_id, originalname, filename, path, width, height,uploadtime) values (?,?,?,?,?,?,?)';
            await connection.execute(sql,[user[0].id,this.#originalName,this.#fileName,this.#path,this.#width,this.#height,this.#uploadTime]);
        } catch (error) {
            console.error(error);
            throw error;
        }finally{
            if(connection)connection.release();
        }
    }

    //通过userid获取该用户的照片url
    static async getPhotoUrls(userid){
        let connection;
        try {
            connection = await pool.getConnection();
            const sql = `SELECT p.* 
                        FROM photos p
                        JOIN users u ON p.user_id = u.id
                        WHERE u.userid = ?
                        ORDER BY p.uploadtime DESC;
                        `;
            const [rows] = await connection.execute(sql,[userid]);
            const photoUrls = rows.map((row)=>{
                return {
                    id:row.id,//存在数据库中的id,这里可以做调整
                    url:`api/uploads/${userid}/${row.filename}`,//照片的访问路径
                    originalName:row.originalname,//照片的原始文件名
                }
            })
            return photoUrls;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            if (connection) connection.release();
        }
    }

    getUserId(){    
        return this.#userid;
    }
    getOriginalName(){
        return this.#originalName;
    }
    getFileName(){
        return this.#fileName;
    }
    getPath(){
        return this.#path;
    }
    getSize(){
        return this.#size;
    }
    getWidth(){
        return this.#width;
    }
    getHeight(){
        return this.#height;
    }
    getDateTime(){
        return this.#dateTime;
    }
    getGps(){
        return this.#gps;
    }
    getCamera(){
        return this.#camera;
    }


}