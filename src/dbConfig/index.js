import mongoose from 'mongoose'


let isConnected = false;

const connect=async()=>{
    try{
        if(isConnected)return;
        await mongoose.connect(process.env.MONGO_URL)
        isConnected=true;
        const connection=mongoose.connection;
        connection.on("connected",()=>{
            console.log("Database connected successfully");
        })
        connection.on("error",(error)=>{
            console.log("Make sure the db is up and running",error);
        })
    }
    catch(error){
        console.log("Something went wrong connecting the db",error);
    }
}

export default connect