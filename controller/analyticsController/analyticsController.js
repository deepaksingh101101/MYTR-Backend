import consentModel from '../../models/consentModel.js';

// Get Forms Analytics
export const getAdminAnalytics = async (req, res) => {
    let { startDate, endDate, admin } = req.query;

    try {

        startDate = new Date(startDate);
        startDate.setHours(0,0,0,0);

        endDate = new Date(endDate);
        endDate.setHours(23,59,59,999)

        const data = await consentModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate },
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
                    date: "$_id",
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
    let { startDate, endDate } = req.query;

    try {
        startDate = new Date(startDate);
        startDate.setHours(0, 0, 0, 0);

        endDate = new Date(endDate);
        endDate.setHours(23, 59, 59, 999);

        const data = await consentModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate }
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
   let { startDate, endDate, caseType } = req.query;
    startDate = new Date(startDate);
    startDate.setHours(0, 0, 0, 0);

    endDate = new Date(endDate);
    endDate.setHours(23, 59, 59, 999);
    try {
        const data = await consentModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate , $lte: endDate},
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
                    date: "$_id",
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

// Age-wise analytics
export const getAgeAnalytics = async (req, res) => {
    let { startDate, endDate } = req.query;

    try {
        startDate = new Date(startDate);
        startDate.setHours(0, 0, 0, 0);

        endDate = new Date(endDate);
        endDate.setHours(23, 59, 59, 999);
        const data = await consentModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate }
                }
            },
            {
                $project: {
                    dob: { $toDate: "$dob" },
                    age: {
                        $dateDiff: {
                            startDate: { $toDate: "$dob" },
                            endDate: "$$NOW",
                            unit: "year"
                        }
                    }
                }
            },
            {
                $bucket: {
                    groupBy: "$age",
                    boundaries: [0, 16, 26, 51, 120],
                    default: "Unknown",
                    output: {
                        count: { $sum: 1 }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    ageRange: "$_id",
                    count: 1
                }
            }
        ]);

        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching age analytics:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};