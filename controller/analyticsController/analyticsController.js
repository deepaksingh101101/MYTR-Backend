import consentModel from '../../models/consentModel.js';

// Get Forms Analytics
export const getAdminAnalytics = async (req, res) => {
    const { startDate, endDate, admin } = req.query;

    try {
        const data = await consentModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
                    createdBy: admin
                }
            },
            {
                $group: {
                    _id: { date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } } },
                    createdForms: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    date: "$_id.date",
                    createdForms: 1
                }
            }
        ]);

        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching admin analytics:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

// Gender-wise analytics
export const getGenderAnalytics = async (req, res) => {
    const { startDate, endDate } = req.query;

    try {
        const data = await consentModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
                }
            },
            {
                $group: {
                    _id: "$gender",
                    totalForms: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    gender: "$_id",
                    totalForms: 1
                }
            }
        ]);

        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching gender analytics:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

// Case type-wise analytics
export const getCaseTypeAnalytics = async (req, res) => {
    const { startDate, endDate, caseType } = req.query;

    try {
        const data = await consentModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
                    caseType: caseType
                }
            },
            {
                $group: {
                    _id: { date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } } },
                    cases: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    date: "$_id.date",
                    cases: 1
                }
            }
        ]);

        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching case type analytics:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};