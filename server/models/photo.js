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
           // console.log([this.#userid,this.#originalName,this.#fileName,this.#path,this.#width,this.#height,this.#uploadTime]);
            const sql = 'insert into photos (userid, originalname, filename, path, width, height,uploadtime) values (?,?,?,?,?,?,?)';
            await connection.execute(sql,[this.#userid,this.#originalName,this.#fileName,this.#path,this.#width,this.#height,this.#uploadTime]);
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