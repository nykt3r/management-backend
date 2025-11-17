// src/modules/dashboard/dashboard.controller.js
const dashboardService = require('./dashboard.service'); 
const getDashboardMetrics = async (req, res) => {
    try {
        const metrics = await dashboardService.getMetrics(); 
        res.status(200).json({
            success: true,
            message: 'Metrics retrieved successfully',
            data: metrics
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            success: false,
            message: 'Error obteniendo métricas',
            error: error.message 
        });
    }
};

module.exports = { getDashboardMetrics };