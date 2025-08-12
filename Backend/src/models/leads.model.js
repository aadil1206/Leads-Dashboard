import mongoose from "mongoose";

const leadsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    altPhone: {
      type: String,
      default: "",
      trim: true,
    },
    email: {
      type: String,
      default: "",
      trim: true,
    },
    altEmail: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      default: "",
    },
    qualification: {
      type: String,
      default: "",
    },
    interestField: {
      type: String,
      default: "",
    },
    source: {
      type: String,
      default: "",
    },
    assignedTo: {
      type: String,
      default: "",
    },
    jobInterest: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    passoutYear: {
      type: String,
      default: "",
    },
    heardFrom: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Leads = mongoose.model("Leads", leadsSchema);

export default Leads;
