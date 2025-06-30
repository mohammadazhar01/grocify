import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import { stripeWebhooks } from './controllers/orderController.js';
import { Console } from 'console';

const app = express();
const port = process.env.PORT || 4000;

await connectDB()
await connectCloudinary()

// Allow multiple origins
const allowedOrigins = ['http://localhost:5173', process.env.VITE_FRONTEND_URL]

app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks)

// Middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));


app.get('/', (req, res) => res.send("API is Working"));
app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/address', addressRouter)
app.use('/api/order', orderRouter)

const server = http.createServer(app);

export const io = new Server(server, {
    cors:{
        origin: allowedOrigins,
        credentials: true,
    },
});

io.on('connection', (socket)=> {
    console.log("Admin Connected", socket.id);


    socket.on('new-order',(order)=>{
        console.log('New order recieved:', order);
        io.emit('order-notification', order);
    });

    socket.on('disconnect',()=>{
        console.log('User disconnect:', socket.id);
    })
})

app.set("io",io);

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})

export default server;