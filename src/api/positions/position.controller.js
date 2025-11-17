// src/api/positions/position.controller.js

const positionService = require('./position.service');

const getPaginatedPositions = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const result = await positionService.getPaginatedPositions(page, limit);
        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

const getAllPositions = async (req, res) => {
    try {
        const positions = await positionService.getAllPositions();
        res.status(200).json({ 
            success: true, 
            data: positions 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

const getPositionById = async (req, res) => {
    try {
        const position = await positionService.getPositionById(req.params.id);
        res.status(200).json({
            success: true,
            data: position
        });
    } catch (error) {
        if (error.message === "Position not found") {
            return res.status(404).json({ 
                success: false,
                message: error.message 
            });
        }
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

const createPosition = async (req, res) => {
    try {
        if (!req.body.positionName) {
            return res.status(400).json({ 
                success: false,
                message: "positionName is required" 
            });
        }

        const position = await positionService.createPosition(req.body);
        res.status(201).json({
            success: true,
            message: "Position created successfully",
            data: position
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

const updatePosition = async (req, res) => {
    try {
        const updated = await positionService.updatePosition(req.params.id, req.body);
        res.status(200).json({
            success: true,
            message: "Position updated successfully",
            data: updated
        });
    } catch (error) {
        if (error.message.includes("not found")) {
            return res.status(404).json({ 
                success: false,
                message: error.message 
            });
        }
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

const deletePosition = async (req, res) => {
    try {
        const result = await positionService.deletePosition(req.params.id);
        res.status(200).json({
            success: true,
            message: "Position deleted successfully"
        });
    } catch (error) {
        res.status(400).json({ 
            success: false, 
            message: error.message 
        });
    }
};

module.exports = {
    getPaginatedPositions,
    getAllPositions,
    getPositionById,
    createPosition,
    updatePosition,
    deletePosition
};
