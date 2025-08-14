import React from "react";
import validationSchema from "../Schema/leadValidationSchema";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Select from "react-select";
import { addLead, getLeads } from "../Api";
import { fetchLeads } from "../services/leadsService";
import { initialValues } from "../constants/formInitialValues";
import FormField from "./FormField";
import { FormActions } from "./FormActions";
import {
  statusOptions,
  qualificationOptions,
  interestFieldOptions,
  sourceOptions,
  assignedToOptions,
} from "../constants/formOptions";

const AddLeadsModal = ({ setIsAddLeadModalOpen, isAddLeadModalOpen ,setGetLeadsData}) => {

  // State to manage form submission status
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  // Function to handle form submission and add a new lead
  const handleSubmit = async (values) => {
    const payload = {
      ...values,
      status: values.status?.value,
      qualification: values.qualification?.value,
      interestField: values.interestField?.value,
      source: values.source?.value,
      assignedTo: values.assignedTo?.value,
    };

    try {
      await addLead({ data: payload });
      setIsAddLeadModalOpen(false);
    } catch (error) {
      console.error("Error adding lead:", error);
    }
   const data = await fetchLeads();
    setGetLeadsData(data);
  };

  return (
    <div className="fixed inset-0 bg-[#000000]/80 bg- flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-lg h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#020817]">Add Lead</h2>
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
              {/* Text Inputs */}
              <FormField name="name" label="Name" type="text" />
              <FormField name="phone" label="Phone" type="tel" />
              <FormField name="altPhone" label="Alt. Phone" type="tel" />
              <FormField name="email" label="Email" type="email" />
              <FormField name="altEmail" label="Alt. Email" type="email" />

              {/* Select Inputs */}
              <FormField
                name="status"
                label="Status"
                as="select"
                options={statusOptions}
                setFieldValue={setFieldValue}
              />
              <FormField
                name="qualification"
                label="Qualification"
                as="select"
                options={qualificationOptions}
                setFieldValue={setFieldValue}
              />
              <FormField
                name="interestField"
                label="Interest Field"
                as="select"
                options={interestFieldOptions}
                setFieldValue={setFieldValue}
              />
              <FormField
                name="source"
                label="Source"
                as="select"
                options={sourceOptions}
                setFieldValue={setFieldValue}
              />
              <FormField
                name="assignedTo"
                label="Assigned To"
                as="select"
                options={assignedToOptions}
                setFieldValue={setFieldValue}
              />

              {/* Other Fields */}
              <FormField name="jobInterest" label="Job Interest" type="text" />
              <FormField name="state" label="State" type="text" />
              <FormField name="city" label="City" type="text" />
              <FormField name="passoutYear" label="Passout Year" type="text" />
              <FormField
                name="heardFrom"
                label="Heard From"
                type="text"
                className="col-span-2"
              />

              {/* Form Actions */}
              <FormActions
                onCancel={() => setIsAddLeadModalOpen(false)}
                isSubmitting={isSubmitting}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddLeadsModal;
