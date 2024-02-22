import mongoose from "mongoose"

export const connect = () => {
    // Connection URL
    const url = process.env.MONGODB_URI;

    if (!url || url === "") throw new Error("MONGODB_URI is not set in .env.local");

    // Check the current connection state
    if (mongoose.connection.readyState === 0) {

        // Connect to MongoDB only if not already connected
        mongoose.connect(url)
            .then(() => {
                console.log('Connected to MongoDB successfully');
            })
            .catch(error => {
                console.error('Error connecting to MongoDB:', error);
            });
    }

}