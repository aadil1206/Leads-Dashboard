import React, { use, useContext, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import Select from "react-select";
import { addLead, getLeads } from "../../Api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import LeadsTable from "../../components/LeadsTable";
import UserContext from "../../context/UserContext/Context";
import { GiHamburgerMenu } from "react-icons/gi";
import { LiaFilterSolid } from "react-icons/lia";

const Leads = () => {
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = React.useState(false);
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  } = useContext(UserContext);
  const [getLeadsData, setGetLeadsData] = React.useState([]);
  const statusOptions = [
    { value: "new", label: "New" },
    { value: "follow-up", label: "Follow-Up" },
    { value: "qualified", label: "Qualified" },
    { value: "converted", label: "Converted" },
  ];

  const qualificationOptions = [
    { value: "high-school", label: "High School" },
    { value: "masters", label: "Masters" },
    { value: "phd", label: "PhD" },
  ];

  const interestFieldOptions = [
    { value: "web-dev", label: "Web Development" },
    { value: "mobile-dev", label: "Mobile Development" },
    { value: "data-science", label: "Data Science" },
  ];

  const sourceOptions = [
    { value: "website", label: "Website" },
    { value: "social-media", label: "Social Media" },
    { value: "email-campaign", label: "Email Campaign" },
  ];

  const assignedToOptions = [
    { value: "john-doe", label: "John Doe" },
    { value: "jane-smith", label: "Jane Smith" },
  ];
  // ====== STYLES ======
  const commonSelectStyles = {
    control: (base) => ({
      ...base,
      borderRadius: "0.375rem",
      borderColor: "#d1d5db",
      padding: "2px",
      boxShadow: "none",
      "&:hover": { borderColor: "#3b82f6" },
    }),
    menu: (base) => ({
      ...base,
      marginTop: 0,
      marginBottom: "4px",
    }),
  };

  const initialValues = {
    name: "",
    phone: "",
    altPhone: "",
    email: "",
    altEmail: "",
    status: null,
    qualification: null,
    interestField: null,
    source: null,
    assignedTo: null,
    jobInterest: "",
    state: "",
    city: "",
    passoutYear: "",
    heardFrom: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().trim().required("Name is required"),

    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone must be exactly 10 digits")
      .required("Phone is required"),

    altPhone: Yup.string()
      .matches(/^\d{10}$/, "Alt. Phone must be exactly 10 digits")
      .nullable(),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    altEmail: Yup.string().email("Invalid alt. email format").nullable(),

    status: Yup.object().nullable().required("Status is required"),

    qualification: Yup.object()
      .nullable()
      .required("Qualification is required"),

    interestField: Yup.object()
      .nullable()
      .required("Interest field is required"),

    source: Yup.object().nullable().required("Source is required"),

    assignedTo: Yup.object().nullable().required("Assigned To is required"),

    jobInterest: Yup.string().trim().required("Job interest is required"),

    state: Yup.string().trim().required("State is required"),

    city: Yup.string().trim().required("City is required"),

    passoutYear: Yup.number()
      .typeError("Passout year must be a number")
      .min(1900, "Year must be after 1900")
      .max(new Date().getFullYear(), "Year cannot be in the future")
      .required("Passout year is required"),

    heardFrom: Yup.string().trim().required("Heard From is required"),
  });

  const handleAddLeads = async (data) => {
    try {
      await addLead({ data });
      console.log("Lead added successfully");
    } catch (error) {
      console.error("Error adding lead:", error);
    }
  };

  const handleSubmit = async (values) => {
    console.log("Form Values:", values);

    // Transform select objects to just values
    const payload = {
      ...values,
      status: values.status?.value,
      qualification: values.qualification?.value,
      interestField: values.interestField?.value,
      source: values.source?.value,
      assignedTo: values.assignedTo?.value,
    };
    console.log(payload, "payload");
    try {
      await addLead({ data: payload });
      console.log("Lead added successfully");
      setIsAddLeadModalOpen(false);
    } catch (error) {
      console.error("Error adding lead:", error);
    }
    fetchLeads();
  };
  const fetchLeads = async () => {
    try {
      const response = await getLeads();
      setGetLeadsData(response.data);
      if (response && response.data) {
        console.log("Fetched Leads:", response.data);
      } else {
        console.warn("No leads data found");
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };
  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="w-full h-full bg-gray-100 rounded-lg shadow-md overflow-y-auto">
      <div className="flex justify-between h-[78px] items-center bg-white p-4  shadow-sm">
        <div className="flex items-center gap-2">
          <GiHamburgerMenu
            className="sm:hidden flex"
            onClick={() => {
              setIsMobileMenuOpen(true);
            }}
          />
          <div className="flex flex-col">
            <p className="text-[#020817] font-bold text-[21px]">Leads</p>
            <span className="text-[#64748b] font-normal text-[14px]">
              Manage And Track Your Leads
            </span>
          </div>
        </div>
        <button
          onClick={() => setIsAddLeadModalOpen(true)}
          className="flex gap-2 items-center bg-[#0080ff] text-white sm:px-4 px-2 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          <FaPlus />
          <span className="font-[500] text-[12px] text-[#fff]">Add Lead</span>
        </button>

        {isAddLeadModalOpen && (
          <div className="fixed inset-0 bg-[#000000]/80 bg- flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-lg h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-[#020817]">
                  Add Lead
                </h2>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setIsAddLeadModalOpen(false)}
                >
                  ✕
                </button>
              </div>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ setFieldValue }) => (
                  <Form className="grid grid-cols-2 gap-4">
                    <div className="sm:col-span-1 col-span-2">
                      <label className="block text-sm text-[#020817]">
                        Name
                      </label>
                      <Field
                        name="name"
                        type="text"
                        className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div className="sm:col-span-1 col-span-2">
                      <label className="block text-sm text-[#020817]">
                        Phone
                      </label>
                      <Field
                        name="phone"
                        type="text"
                        className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>

                    <div className="sm:col-span-1 col-span-2">
                      <label className="block text-sm text-[#020817]">
                        Alt. Phone
                      </label>
                      <Field
                        name="altPhone"
                        type="text"
                        className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="altPhone"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div className="sm:col-span-1 col-span-2">
                      <label className="block text-sm text-[#020817]">
                        Email
                      </label>
                      <Field
                        name="email"
                        type="email"
                        className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>

                    <div className="sm:col-span-1 col-span-2">
                      <label className="block text-sm text-[#020817]">
                        Alt. Email
                      </label>
                      <Field
                        name="altEmail"
                        type="email"
                        className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="altEmail"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div className="sm:col-span-1 col-span-2">
                      <label className="block text-sm text-[#020817]">
                        Status
                      </label>
                      <Select
                        options={statusOptions}
                        menuPlacement="top"
                        className="text-sm"
                        onChange={(option) => setFieldValue("status", option)}
                      />
                      <ErrorMessage
                        name="status"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>

                    <div className="sm:col-span-1 col-span-2">
                      <label className="block text-sm text-[#020817]">
                        Qualification
                      </label>
                      <Select
                        options={qualificationOptions}
                        menuPlacement="top"
                        className="text-sm"
                        onChange={(option) =>
                          setFieldValue("qualification", option)
                        }
                      />
                      <ErrorMessage
                        name="qualification"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div className="sm:col-span-1 col-span-2">
                      <label className="block text-sm text-[#020817]">
                        Interest Field
                      </label>
                      <Select
                        options={interestFieldOptions}
                        menuPlacement="top"
                        className="text-sm"
                        onChange={(option) =>
                          setFieldValue("interestField", option)
                        }
                      />
                      <ErrorMessage
                        name="interestField"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>

                    <div className="sm:col-span-1 col-span-2">
                      <label className="block text-sm text-[#020817]">
                        Source
                      </label>
                      <Select
                        options={sourceOptions}
                        menuPlacement="top"
                        className="text-sm"
                        onChange={(option) => setFieldValue("source", option)}
                      />
                      <ErrorMessage
                        name="source"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div className="sm:col-span-1 col-span-2">
                      <label className="block text-sm text-[#020817]">
                        Assigned To
                      </label>
                      <Select
                        options={assignedToOptions}
                        menuPlacement="top"
                        className="text-sm"
                        onChange={(option) =>
                          setFieldValue("assignedTo", option)
                        }
                      />
                      <ErrorMessage
                        name="assignedTo"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>

                    <div className="sm:col-span-1 col-span-2">
                      <label className="block text-sm text-[#020817]">
                        Job Interest
                      </label>
                      <Field
                        name="jobInterest"
                        type="text"
                        placeholder="Select job interest"
                        className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="jobInterest"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div className="sm:col-span-1 col-span-2">
                      <label className="block text-sm text-[#020817]">
                        State
                      </label>
                      <Field
                        name="state"
                        type="text"
                        className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="state"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>

                    <div className="sm:col-span-1 col-span-2">
                      <label className="block text-sm text-[#020817]">
                        City
                      </label>
                      <Field
                        name="city"
                        type="text"
                        className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="city"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div className="sm:col-span-1 col-span-2">
                      <label className="block text-sm text-[#020817]">
                        Passout Year
                      </label>
                      <Field
                        name="passoutYear"
                        type="text"
                        className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="passoutYear"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm text-[#020817]">
                        Heard From
                      </label>
                      <Field
                        name="heardFrom"
                        type="text"
                        className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="heardFrom"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>

                    <div className="col-span-2 flex justify-end gap-3 mt-4">
                      <button
                        type="button"
                        className="px-4 py-2 rounded-md border text-[#020817] hover:bg-gray-100"
                        onClick={() => setIsAddLeadModalOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Add Lead
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 w-full flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <input
            type="text"
            placeholder="Search leads..."
            className="w-full sm:w-auto flex-1 px-3 py-2 border border-[#64768b]  rounded-lg text-sm text-[#64768b] "
          />

          <button className="flex items-center gap-2 px-4 py-2 border border-[#64768b]  rounded-lg text-sm  hover:bg-gray-50">
            <LiaFilterSolid />
            <span className="text-[14px] font-medium text-[#020817]">
              Filters
            </span>
          </button>
        </div>

        <LeadsTable data={getLeadsData} />
      </div>
    </div>
  );
};

export default Leads;
