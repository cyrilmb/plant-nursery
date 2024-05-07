import mongoose from 'mongoose'

async function dbConnet() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!)
    } catch (error) {
        throw new Error('Connection to db failed')
    }
}

export default dbConnet