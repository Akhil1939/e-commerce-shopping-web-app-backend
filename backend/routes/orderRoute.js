const express = require("express");
const { newOrder, getSingleOrder, myOrder, getallOrder, updateOrder, deleteOrder } = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleWares/auth");
const router = express.Router(); 

router.route('/order/new').post(isAuthenticatedUser, newOrder)
router.route('/order/:id').get(isAuthenticatedUser,getSingleOrder)
router.route('/orders/me').get(isAuthenticatedUser, myOrder)
router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles('admin'), getallOrder)
router.route("/admin/order/:id").put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder)


module.exports = router