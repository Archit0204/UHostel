import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL as string)
    .then(() => console.log("DB Connected"))
    .catch((err) => {
        console.error(err);
        console.log("DB connextion issues");
        process.exit(1);
    });
}