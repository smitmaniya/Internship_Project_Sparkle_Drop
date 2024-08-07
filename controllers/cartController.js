const CartItem = require('../models/CartItem');
const Service = require('../models/Service');

// Add service to cart
exports.addToCart = async (req, res) => {
    const { services, userId } = req.body;

    try {
        const cartItems = await Promise.all(services.map(async ({ serviceId, quantity }) => {
            const service = await Service.findById(serviceId).populate('serviceProviderId');
            if (!service) {
                throw new Error(`Service with ID ${serviceId} not found`);
            }

            const subtotal = service.price * quantity;

            const cartItem = new CartItem({
                user: userId, // Use userId from request body
                service: serviceId,
                quantity,
                subtotal,
                serviceProvider: service.serviceProviderId._id // Save the service provider ID
            });

            await cartItem.save();

            return {
                _id: cartItem._id,
                user: cartItem.user,
                service: {
                    _id: service._id,
                    name: service.name,
                    description: service.description,
                    price: service.price,
                },
                quantity: cartItem.quantity,
                subtotal: cartItem.subtotal,
                serviceProvider: {
                    _id: service.serviceProviderId._id,
                    company_name: service.serviceProviderId.company_name,
                    address: service.serviceProviderId.address // Assuming address field is available
                }
            };
        }));

        // Calculate total
        const total = cartItems.reduce((acc, item) => acc + item.subtotal, 0);

        res.status(201).json({ message: 'Services added to cart successfully', cartItems, total });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while adding services to cart' });
    }
};

// Get cart items by service provider ID
exports.getCartItemsByServiceProvider = async (req, res) => {
    const { serviceProviderId } = req.query;

    try {
        const cartItems = await CartItem.find({ serviceProvider: serviceProviderId })
            .populate('service')
            .populate('user', 'name email') // Assuming User model has name and email fields
            .populate({
                path: 'service',
                populate: {
                    path: 'serviceProviderId',
                    model: 'Service_Provider',
                    select: 'company_name address'
                }
            });

        if (cartItems.length === 0) {
            return res.status(404).json({ message: 'No cart items found for this service provider' });
        }

        // Prepare the response
        const responseItems = cartItems.map(item => ({
            _id: item._id,
            user: {
                _id: item.user._id,
                name: item.user.name,
                email: item.user.email
            },
            service: {
                _id: item.service._id,
                name: item.service.name,
                description: item.service.description,
                price: item.service.price,
                providerName: item.service.serviceProviderId.company_name,
                providerid: item.service.serviceProviderId._id,
                providerAddress: item.service.serviceProviderId.address
            },
            quantity: item.quantity,
            subtotal: item.subtotal.toFixed(2),
            deliveryOption: item.deliveryOption,
            userAddress: item.userAddress,
            deliveryFee: item.deliveryFee,
            status: item.status
        }));

        // Calculate total
        const total = cartItems.reduce((acc, item) => acc + item.subtotal, 0);

        res.status(200).json({ cartItems: responseItems, total: total.toFixed(2) });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching cart items' });
    }
};


// Get cart items for a user
exports.getCartItems = async (req, res) => {
    const { userId } = req.query;

    try {
        const cartItems = await CartItem.find({ user: userId })
        .populate({
            path: 'service',
            populate: {
                path: 'serviceProviderId',
                model: 'Service_Provider',
                select: 'company_name address'
            }
        });
        // Calculate total with 13% tax
        const total = cartItems.reduce((acc, item) => acc + item.subtotal * 1.13, 0);

        // Prepare the response
        const responseItems = cartItems.map(item => ({
            _id: item._id,
            user: item.user,
            service: {
                _id: item.service._id,
                name: item.service.name,
                description: item.service.description,
                providerName: item.service.serviceProviderId.company_name,
                providerid: item.service.serviceProviderId._id,
                providerAddress: item.service.serviceProviderId.address
            },
            quantity: item.quantity,
            subtotal: item.subtotal.toFixed(2),
            finalSubtotal: (item.subtotal * 1.13).toFixed(2) // Calculate subtotal with 13% tax
        }));

        res.status(200).json({ cartItems: responseItems, total: total.toFixed(2) });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching cart items' });
    }
};


exports.updateStatus = async (req, res) => {
    const { cartItemId, status } = req.body;

    try {
        const cartItem = await CartItem.findById(cartItemId);
        if (!cartItem) {
            return res.status(404).json({ error: 'CartItem not found' });
        }

        const validStatusTransitions = {
            'Pending': 'Active',
            'Active': 'Completed'
        };

        if (cartItem.status !== status && validStatusTransitions[cartItem.status] === status) {
            cartItem.status = status;
            await cartItem.save();
            return res.status(200).json({ message: 'Status updated successfully', cartItem });
        } else {
            return res.status(400).json({ error: 'Invalid status transition' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while updating status' });
    }
};

exports.removeFromCart = async (req, res) => {
    const { cartItemId } = req.body;

    try {
        const cartItem = await CartItem.findById(cartItemId);
        if (!cartItem) {
            return res.status(404).json({ error: 'CartItem not found' });
        }

        await cartItem.remove();
        res.status(200).json({ message: 'Service removed from cart successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while removing the service from the cart' });
    }
};

