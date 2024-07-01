import consentModel from '../../models/consentModel.js';
import userModel from '../../models/userModel.js';

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

    if (new Date(startDate) > new Date(endDate)) {
        return res.status(400).json({ status: false, message: "Start date cannot be greater than end date" });
    }

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
                $group: {
                    _id: {
                        $cond: [
                            { $lt: ["$age", 18] },
                            "1-18",
                            {
                                $cond: [
                                    { $lt: ["$age", 30] },
                                    "19-30",
                                    {
                                        $cond: [
                                            { $lt: ["$age", 60] },
                                            "31-60",
                                            "60+"
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    ageRange: "$_id",
                    count: 1
                }
            },
            {
                $sort: { ageRange: 1 }
            }
        ]);

        // Ensure all age ranges are present in the response
        const ageRanges = {
            "1-18": 0,
            "19-30": 0,
            "31-60": 0,
            "60+": 0
        };

        data.forEach(item => {
            ageRanges[item.ageRange] = item.count;
        });

        const formattedData = Object.keys(ageRanges).map(range => ({
            ageRange: range,
            count: ageRanges[range]
        }));

        res.status(200).json(formattedData);
    } catch (error) {
        console.error("Error fetching age analytics:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};
export const getAnalyticsData = async (req, res) => {
    try {
        // Fetch total number of consent forms
        const totalConsents = await consentModel.countDocuments();

        // Fetch total number of admins (excluding super admins)
        const totalAdmins = await userModel.countDocuments({ isSuperAdmin: false });

        // Fetch 5 most recent consent forms
        const recentConsents = await consentModel.find({}, { createdBy: 1, caseType: 1, createdAt: 1 })
            .sort({ createdAt: -1 })
            .limit(5);

        // Combine the data into one response
        res.status(200).json({ 
            totalConsents, 
            totalAdmins, 
            recentConsents 
        });
    } catch (error) {
        console.error("Error fetching analytics data:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};
export const getConsentStatusCounts = async (req, res) => {
    try {
        const [inProgressCount, submittedCount] = await Promise.all([
            consentModel.countDocuments({ status: 'in-progress' }),
            consentModel.countDocuments({ status: 'submitted' })
        ]);

        res.status(200).json({
            status: true,
            inProgressCount,
            submittedCount
        });
    } catch (error) {
        console.error("Error fetching consent status counts:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};