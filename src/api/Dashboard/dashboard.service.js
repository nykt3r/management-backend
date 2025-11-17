const { dashboardRepository } = require('./dashboard.repository');

const dashboardService = {
    async getMetrics() {
        const totalUsers = await dashboardRepository.getTotalUsers();
        const totalPositions = await dashboardRepository.getTotalPositions();

        const avgAgeRaw = await dashboardRepository.getAverageAge();
        const averageAge = parseFloat(avgAgeRaw.getDataValue('averageAge')).toFixed(1);

        const usersByPositionRaw = await dashboardRepository.getUsersByPosition();
        const usersByPosition = usersByPositionRaw.map(x => ({
            position: x.position ? x.position.positionName : 'N/A',
            count: x.getDataValue('count')
        }));

        const agesRaw = await dashboardRepository.getAgeDistribution();
        const ageDistribution = calculateAgeGroups(agesRaw);

        return {
            totalUsers,
            totalPositions,
            averageAge,
            usersByPosition,
            ageDistribution
        };
    }
};

function calculateAgeGroups(users) {
    const groups = { '20–25': 0, '26–30': 0, '31–35': 0, '36+': 0 };
    users.forEach(u => {
        const age = u.age;
        if (age >= 20 && age <= 25) groups['20–25']++;
        else if (age >= 26 && age <= 30) groups['26–30']++;
        else if (age >= 31 && age <= 35) groups['31–35']++;
        else if (age >= 36) groups['36+']++;
    });
    return groups;
}

module.exports =  dashboardService ;