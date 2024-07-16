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
        const cartItems = await CartItem.find({ user: userId }).populate('service');
        
        // Calculate total
        const total = cartItems.reduce((acc, item) => acc + item.subtotal, 0);

        res.status(200).json({ cartItems, total });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching cart items' });
    }
};
