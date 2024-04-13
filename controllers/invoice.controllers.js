const Invoice = require("../models/invoice.model");
const { generateRandomNumbers } = require("../middleware/numberGenerator.js");

const createInvoice = async (req, res) => {
    try {
        const { items } = req.body;
        const invoiceNumber = generateRandomNumbers();
        const response = items.map((item) => {
            return {
                ...item,
                total: Math.ceil(item.quantity * item.price),
            };
        });
        const total = response.reduce((a, b) => a + b.total, 0);

        let doc = {
            ...req.body,
            invoice_no: invoiceNumber,
            total_amount: total,
            items: response,
        };
        const invoice = await Invoice.create(doc);
        res.status(200).json({ message: "Product created succesfully!", invoice });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await Invoice.findById(id);
        res
            .status(200)
            .json({ message: "Invoice fetched successfully", data: invoice });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getInvoices = async (req, res) => {
    try {

        let response = null;
        const { filter_by } = req.query;
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const filter = {};
        if (filter_by) {
            filter.status = filter_by;
        }
        const invoice = await Invoice.find(filter).sort({ createdAt: -1 });
        response = invoice.slice(startIndex, endIndex);
        const total_pages = Math.ceil(invoice.length / limit);

        res.status(200).json({
            status: "success",
            message: "Invoices fetched successfuly",
            data: response,
            pagination: {
                limit: limit,
                total: invoice.length,
                total_pages: total_pages,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateInvoice = async (req, res) => {
    try {
        const enums = ["open", "paid", "due"];
        const { id } = req.params;
        const { status } = req.body;

        if (!enums.includes(status)) {
            return res.status(422).json({ message: "Unproccessable entity" });
        }

        const invoice = await Invoice.findByIdAndUpdate(id, req.body);
        if (!invoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }
        const updatedInvoice = await Invoice.findById(id);
        res.status(200).json({
            status: "success",
            message: "Invoice updated successfully",
            data: updatedInvoice,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await Invoice.findByIdAndDelete(id);
        if (!invoice) {
            return res.status(404).json({ message: "invoice not found" });
        }
        res.status(200).json({
            status: "success",
            message: "Invoice deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createInvoice,
    getById,
    getInvoices,
    updateInvoice,
    deleteInvoice,
};
