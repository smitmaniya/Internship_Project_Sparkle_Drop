// controllers/checkoutController.js
/*
const Checkout = require('../models/Checkout');
const CartItem = require('../models/CartItem');
const Service = require('../models/Service');

exports.checkout = async (req, res) => {
    const { services, userId, userAddress, deliveryOption, paymentDetails } = req.body;

    try {
        const serviceDetails = await Promise.all(services.map(async ({ serviceId, quantity }) => {
            const service = await Service.findById(serviceId).populate('serviceProviderId');
            if (!service) {
                throw new Error(`Service with ID ${serviceId} not found`);
            }

            const subtotal = service.price * quantity;
            let deliveryFee = 0;

            if (deliveryOption === 'standard') {
                deliveryFee = 5; // Example standard delivery fee
            } else if (deliveryOption === 'priority') {
                deliveryFee = 10; // Example priority delivery fee
            }

            return {
                serviceId: service._id,
                serviceProvider: {
                    id: service.serviceProviderId._id,
                    company_name: service.serviceProviderId.company_name,
                    address: service.serviceProviderId.address
                },
                quantity,
                subtotal
            };
        }));

        // Calculate totals
        const totalSubtotal = serviceDetails.reduce((acc, item) => acc + item.subtotal, 0);
        const totalDeliveryFee = 5; // Adjust as necessary
        const totalTax = totalSubtotal * 0.13; // Example 13% tax rate
        const finalTotal = totalSubtotal + totalDeliveryFee + totalTax;

        // Save checkout details
        const checkout = new Checkout({
            user: userId,
            services: serviceDetails,
            userAddress,
            deliveryOption,
            paymentDetails,
            subtotal: totalSubtotal,
            deliveryFee: totalDeliveryFee,
            tax: totalTax,
            total: finalTotal,
            status: 'Pending'
        });

        await checkout.save();

        res.status(201).json({
            message: 'Checkout completed successfully',
            checkout,
            subtotal: totalSubtotal.toFixed(2),
            deliveryFees: totalDeliveryFee.toFixed(2),
            taxes: totalTax.toFixed(2),
            total: finalTotal.toFixed(2),
            status: 'Pending'
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred during checkout' });
    }
};
*/

const Checkout = require('../models/Checkout');
const Service = require('../models/Service');

exports.checkout = async (req, res) => {
    const { services, userId, userAddress, deliveryOption, paymentDetails, serviceProviderId } = req.body;

    try {
        // Fetch the service provider details
        const serviceProvider = await Service.findById(services[0].serviceId).populate('serviceProviderId');
        if (!serviceProvider || serviceProvider.serviceProviderId._id.toString() !== serviceProviderId) {
            throw new Error(`Service Provider with ID ${serviceProviderId} not found`);
        }

        const serviceProviderDetails = {
            id: serviceProvider.serviceProviderId._id,
            company_name: serviceProvider.serviceProviderId.company_name,
            address: serviceProvider.serviceProviderId.address
        };

        const serviceDetails = await Promise.all(services.map(async ({ serviceId, quantity }) => {
            const service = await Service.findById(serviceId);
            if (!service) {
                throw new Error(`Service with ID ${serviceId} not found`);
            }

            const subtotal = service.price * quantity;

            return {
                serviceId: service._id,
                serviceProvider: serviceProviderDetails,
                quantity,
                subtotal
            };
        }));

        // Calculate totals
        const totalSubtotal = serviceDetails.reduce((acc, item) => acc + item.subtotal, 0);
        const totalDeliveryFee = deliveryOption === 'priority' ? 10 : 5; // Example standard and priority delivery fees
        const totalTax = totalSubtotal * 0.13; // Example 13% tax rate
        const finalTotal = totalSubtotal + totalDeliveryFee + totalTax;

        // Save checkout details
        const checkout = new Checkout({
            user: userId,
            services: serviceDetails,
            userAddress,
            deliveryOption,
            paymentDetails,
            subtotal: totalSubtotal,
            deliveryFee: totalDeliveryFee,
            tax: totalTax,
            total: finalTotal,
            status: 'Pending'
        });

        await checkout.save();

        res.status(201).json({
            message: 'Checkout completed successfully',
            checkout: {
                user: checkout.user,
                services: checkout.services,
                userAddress: checkout.userAddress,
                deliveryOption: checkout.deliveryOption,
                paymentDetails: checkout.paymentDetails,
                createdAt: checkout.createdAt,
                updatedAt: checkout.updatedAt,
                __v: checkout.__v
            },
            subtotal: totalSubtotal.toFixed(2),
            deliveryFees: totalDeliveryFee.toFixed(2),
            taxes: totalTax.toFixed(2),
            total: finalTotal.toFixed(2),
            status: checkout.status
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred during checkout' });
    }
};
exports.getCheckoutsByServiceProvider = async (req, res) => {
    const { serviceProviderId } = req.params;

    try {
        // Find checkouts that include services from the specified service provider
        const checkouts = await Checkout.find({ 
            "services.serviceProvider.id": serviceProviderId 
        });

        if (!checkouts.length) {
            return res.status(404).json({ message: 'No checkouts found for this service provider' });
        }

        res.status(200).json({ checkouts });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while retrieving checkouts' });
    }
};

exports.getAllCheckouts = async (req, res) => {
    try {
        // Retrieve all checkout records
        const checkouts = await Checkout.find();

        if (!checkouts.length) {
            return res.status(404).json({ message: 'No checkout orders found' });
        }

        res.status(200).json({
            checkouts: checkouts.map(checkout => ({
                user: checkout.user,
                services: checkout.services,
                userAddress: checkout.userAddress,
                deliveryOption: checkout.deliveryOption,
                paymentDetails: checkout.paymentDetails,
                createdAt: checkout.createdAt,
                updatedAt: checkout.updatedAt,
                __v: checkout.__v,
                subtotal: checkout.subtotal.toFixed(2),
                deliveryFees: checkout.deliveryFee.toFixed(2),
                taxes: checkout.tax.toFixed(2),
                total: checkout.total.toFixed(2),
                status: checkout.status
            }))
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while retrieving checkouts' });
    }
};