const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Ensure required environment variables exist
if (!process.env.MONGODB_URI) {
    console.error('Missing required env var: MONGODB_URI');
    process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const userRoutes = require('./routes/userRoutes');
const actionRoutes = require('./routes/actionRoutes');
const tokenRoutes = require('./routes/tokenRoutes');

// Health endpoint
app.get('/healthz', (req, res) => {
    const dbState = mongoose.connection.readyState; // 0=disconnected,1=connected,2=connecting,3=disconnecting
    res.status(200).json({ status: 'ok', dbState });
});

app.use('/users', userRoutes);
app.use('/actions', actionRoutes);
app.use('/tokens', tokenRoutes);

// MongoDB connection
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(err.status || 500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
const shutdown = async (signal) => {
    console.log(`Received ${signal}. Shutting down gracefully...`);
    server.close(async () => {
        try {
            await mongoose.connection.close(false);
            console.log('MongoDB connection closed.');
        } catch (e) {
            console.error('Error during MongoDB disconnect:', e);
        } finally {
            process.exit(0);
        }
    });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));