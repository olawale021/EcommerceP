const router = require('express').Router();
const OrderController = require('../controllers/orderController');

router.post('/orders', OrderController.createOrder);
router.get('/orders/:id', OrderController.getOrder);
router.get('/user/:userId/orders', OrderController.getUserOrders);

module.exports = router;
