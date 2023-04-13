import mongoose from "mongoose"

const connectMongo = async () => {

    try{
        const {connection } = await mongoose.connect(process.env.MONGO_URL)

        if(connection.readyState === '1'){
            return Promise.resolve(true)

        }
    }catch(e){
        return Promise.reject(error)
    }
}

export default connectMongo;