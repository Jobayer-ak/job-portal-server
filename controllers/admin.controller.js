const { getAllCandidatesService } = require("../services/admin.services");

exports.getAllCandidates = async(req, res) =>{
    try {
        
        const candidates = await getAllCandidatesService();

        res.status(200).json({
            status: "Success",
            candidates,
        })
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            error: error.message,
        })
    }
};