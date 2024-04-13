const { Router } = require("express");
const {
    createInvoice,
    getById,
    getInvoices,
    updateInvoice,
    deleteInvoice
} = require("../controllers/invoice.controllers.js");
const { verifyToken } = require('../middleware/extractToken.js')

const apiRouter = Router();

apiRouter.post("/api/invoice/create", verifyToken, createInvoice);
apiRouter.get("/api/invoice/:id", verifyToken, getById);
apiRouter.get("/api/invoice", verifyToken, getInvoices);
apiRouter.patch("/api/invoice/:id", verifyToken, updateInvoice);
apiRouter.delete("/api/invoice/:id", verifyToken, deleteInvoice);

module.exports = apiRouter;
