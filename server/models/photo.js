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

    static async storeTag(userid,tag){
        let connection;
        try {
            connection = await pool.getConnection();
            const [user] = await connection.execute('SELECT id FROM users WHERE userid = ?', [userid]);
            const sql = 'insert into tags (user_id, name) values (?,?)';
            await connection.execute(sql,[user[0].id,tag]);
        } catch (error) {
            console.error(error);
            throw error;
        }finally{
            if(connection)connection.release();
        }
    }

    static async addTagToPhoto(userid,photoid,tag){
        let connection;
        try {
            connection = await pool.getConnection();
            const [user] = await connection.execute('SELECT id FROM users WHERE userid = ?', [userid]);
            if(user.length===0)throw new Error('用户不存在');//验证是不是这个用户的照片
            const [photo] = await connection.execute('SELECT id FROM photos WHERE id = ? AND user_id = ?', [photoid,user[0].id]);
            if(photo.length===0)throw new Error('照片不存在');//验证这个照片存不存在
            const [tags] = await connection.execute('SELECT * FROM tags WHERE user_id = ? AND name = ?', [user[0].id,tag]);
            console.log(user[0].id,tag);
            if(tags.length===0)throw new Error('标签不存在');//验证这个标签存不存在
            const sql = 'insert into photo_tags (photo_id, tag_id) values (?,?)';
            await connection.execute(sql,[photoid,tags[0].id]);
        } catch (error) {
            console.error(error);
            throw error;
        }finally{
            if(connection)connection.release();
        }
    }


    //通过userid获取该用户的照片url等信息
    static async getPhotoUrls(userid,tags){
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
            const sqlTags = 'select t.name from tags t join photo_tags pt on t.id = pt.tag_id where pt.photo_id = ?';
            for(const row of rows){
                const [tagRows] = await connection.execute(sqlTags,[row.id]);
                row.tags = tagRows.map(tagRow=>tagRow.name);
            }

            const photoUrls = rows.map((row)=>{
                return {
                    id:row.id,//存在数据库中的id,这里可以做调整
                    url:`api/uploads/${userid}/${row.filename}`,//照片的访问路径
                    originalName:row.originalname,//照片的原始文件名
                    solution:{
                        width:row.width,
                        height:row.height
                    },
                    tags:row.tags,//该照片的标签
                }
            })
            console.log(photoUrls);
            return photoUrls;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            if (connection) connection.release();
        }
    }

    static async getAllTags(userid){
        let connection;
        try {
            connection = await pool.getConnection();
            const sql = `select * from tags t join users u on t.user_id = u.id where u.userid = ?`;
            const [rows] = await connection.execute(sql,[userid]);
            const tags = rows.map(row=>row.name);
            return tags;
        } catch (error) {
            console.error(error);
            throw error;
        }finally{
            if(connection)connection.release();
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