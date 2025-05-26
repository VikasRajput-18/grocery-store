import { confirmOrder, createOrder, getOrderById, getOrder, updateOrder } from "../controllers/order/order.controller.js"
import { verifyToken } from "../middlewares/verifyToken.middleware.js"



export const orderRoutes = async (fastify, options) => {
    fastify.addHook("preHandler", async (request, reply) => {
        const isAuthenticated = await verifyToken(request, reply);
        if (!isAuthenticated) {
            return reply.code(401).send({ message: "Unauthorized" })
        }
    });

    fastify.post("/order", createOrder)
    fastify.get("/order", getOrder);
    fastify.patch("/order/:orderId/status", updateOrder);
    fastify.patch("/order/:orderId/confirm", confirmOrder);
    fastify.patch("/order/:orderId", getOrderById);

}