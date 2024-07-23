const CartItem = require('../models/CartItem');
const Service = require('../models/Service');

// Add service to cart
exports.addToCart = async (req, res) => {
    const { services, userId } = req.body;

    try {
        const cartItems = await Promise.all(services.map(async ({ serviceId, quantity }) => {
            const service = await Service.findById(serviceId);
            if (!service) {
                throw new Error(`Service with ID ${serviceId} not found`);
            }

            const subtotal = service.price * quantity;

            const cartItem = new CartItem({
                user: userId, // Use userId from request body
                service: serviceId,
                quantity,
                subtotal
            });

            await cartItem.save();
            return cartItem;
        }));

        // Calculate total
        const total = cartItems.reduce((acc, item) => acc + item.subtotal, 0);

        res.status(201).json({ message: 'Services added to cart successfully', cartItems, total });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while adding services to cart' });
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
                    select: 'company_name'
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
                providerName: item.service.serviceProviderId.company_name
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
