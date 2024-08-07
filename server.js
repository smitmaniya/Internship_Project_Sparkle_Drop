const express = require('express');
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const driverRoutes = require('./routes/driverRoute.js');
const cartRoutes = require('./routes/cartRoutes');
//const userRoute = require('./routes/userRoutes');
const bankDetailsRoutes = require('./routes/bankDetailsRoutes');
const serviceRoute = require('./routes/service.js');
const orderRoutes = require('./routes/orderRoute');
const serviceProviderRoutes = require('./routes/serviceProviderRoutes');
const checkoutRoutes = require('./routes/checkout');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/users', authRoutes,userRoutes);
//app.use('/api/user', userRoute);// for customer
app.use('/api/service-providers', serviceRoute);
app.use('/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/driverdata', driverRoutes);
app.use('/api/bank-details', bankDetailsRoutes);
app.use('/api', checkoutRoutes);
app.use('/api/location', serviceProviderRoutes);
//console.log("***")


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
