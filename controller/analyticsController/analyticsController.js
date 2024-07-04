import consentModel from '../../models/consentModel.js';
import userModel from '../../models/userModel.js';
import moment from 'moment';

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
                    dob: {
                        $dateFromString: {
                            dateString: "$dob",
                            format: "%d/%m/%Y", // Adjust this format to match your data
                            onError: null,
                            onNull: null
                        }
                    },
                    age: {
                        $dateDiff: {
                            startDate: {
                                $dateFromString: {
                                    dateString: "$dob",
                                    format: "%d/%m/%Y", // Adjust this format to match your data
                                    onError: null,
                                    onNull: null
                                }
                            },
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


export const getConsentFormAnalytics = async (req, res) => {
    let { period } = req.query;
    if (!period) {
        return res.status(400).json({ status: false, message: "Period query parameter is required" });
    }

    try {
        let startDate, endDate, format;
        const today = moment().startOf('day');

        if (period === 'week') {
            startDate = today.clone().startOf('isoWeek');
            endDate = today.clone().endOf('isoWeek');
            format = '%Y-%m-%d'; // Format for days
        } else if (period === 'month') {
            startDate = today.clone().startOf('month');
            endDate = today.clone().endOf('month');
            format = '%Y-%m-%d'; // Format for days within a month
        } else if (period === 'year') {
            startDate = today.clone().startOf('year');
            endDate = today.clone().endOf('year');
            format = '%Y-%m'; // Format for months within a year
        } else {
            return res.status(400).json({ status: false, message: "Invalid period query parameter" });
        }

        const data = await consentModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate.toDate(), $lte: endDate.toDate() },
                    status: 'submitted' // Only count consent forms with 'submitted' status
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: format, date: "$createdAt" }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            },
            {
                $project: {
                    date: "$_id",
                    count: 1,
                    _id: 0
                }
            }
        ]);

        res.status(200).json({ status: true, data });
    } catch (error) {
        console.error("Error fetching consent form analytics:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};
export const getRecentConsents = async (req, res) => {
    try {
        const recentConsents = await consentModel.find({}, { createdBy: 1, caseType: 1, createdAt: 1 })
            .sort({ createdAt: -1 })
            .limit(5);
        res.status(200).json({ recentConsents });
    } catch (error) {
        console.error("Error fetching recent consents:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};