import Leads from "../models/leads.model.js";

export const addLead = async (req, res) => {
  try {
    const leadData = req.body.data || req.body;

    const newLead = new Leads(leadData);
    await newLead.save();
    res.status(201).json({ message: "Lead added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getAllLeads = async (req, res) => {
  try {
    let { search = "", status = "" } = req.query || "";
    
    let searchCriteria = {};
    if (search) {
      searchCriteria.name = {
        $regex: search,
        $options: "i", 
      };
    }

    if (status) {
      searchCriteria.status = {
        $in: status.split(",").map((s) => new RegExp(`^${s}$`, "i")),
      };
    }

    const leads = await Leads.find(searchCriteria).lean();
    res.status(200).json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
