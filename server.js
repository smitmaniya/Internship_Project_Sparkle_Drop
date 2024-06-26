const express = require('express');
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
//const userRoute = require('./routes/userRoutes');
const serviceRoute = require('./routes/service.js');
const orderRoutes = require('./routes/orderRoute');
const serviceProviderRoutes = require('./routes/serviceProviderRoutes');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', authRoutes,userRoutes);
//app.use('/api/user', userRoute);// for customer
app.use('/api/service-providers', serviceRoute);
app.use('/orders', orderRoutes);
app.use('/api/location', serviceProviderRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
