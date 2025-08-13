import React from 'react'
import validationSchema from '../Schema/leadValidationSchema'

const AddLeadsModal = () => {
  return (
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
  )
}

export default AddLeadsModal
