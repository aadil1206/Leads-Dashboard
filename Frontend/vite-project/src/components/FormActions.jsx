export const FormActions = ({ onCancel, isSubmitting = false }) => (
  <div className="col-span-2 flex justify-end gap-3 mt-6">
    <button
      type="button"
      className="px-4 py-2 rounded-md border text-[#020817] hover:bg-gray-100 transition-colors"
      onClick={onCancel}
    >
      Cancel
    </button>
    <button
      type="submit"
      disabled={isSubmitting}
      className={`px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors ${
        isSubmitting ? "opacity-70 cursor-not-allowed" : ""
      }`}
    >
      {isSubmitting ? "Submitting..." : "Add Lead"}
    </button>
  </div>
);
