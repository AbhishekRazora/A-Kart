import { connect } from "mongoose";

async function connectToDatabase(){
    try {
        // await connect(process.env.test_url)
        await connect(process.env.db_url)
    } catch (error) {
        throw new Error("cannot connect to mongoDB")
        
    }
}

export {connectToDatabase}