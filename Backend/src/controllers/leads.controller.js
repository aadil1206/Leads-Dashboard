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

// Get all leads
export const getAllLeads = async (req, res) => {
  try {
    const leads = await Leads.find();
    res.status(200).json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
