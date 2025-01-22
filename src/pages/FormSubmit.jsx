import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FormSubmit = () => {
  const [formData, setFormData] = useState({});
  const [formFields, setFormFields] = useState([]);
  const [formId, setFormId] = useState(null);
  const [formName, setFormName] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

  // Fetch all forms on component mount
  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch("http://localhost:3001/forms");
        const data = await response.json();
        setForms(data);
        if (data.length > 0) {
          setFormId(data[0].id);
          setFormName(data[0].name);
          setFormFields(data[0].fields);
        }
      } catch (err) {
        console.error("Error fetching forms:", err);
      }
    };

    fetchForms();
  }, []); 

  // Handle form selection change
  const handleFormSelect = (e) => {
    const selectedFormId = e.target.value;
    setFormId(selectedFormId);

    const selectedForm = forms.find((form) => form.id === selectedFormId);
    if (selectedForm) {
      setFormFields(selectedForm.fields);
      setFormName(selectedForm.name);
      setFormData({});
      setErrors({});
    }
  };

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const validateForm = () => {
    let validationErrors = {};
    let isValid = true;

    formFields.forEach((field) => {
      const fieldValue = formData[field.placeholder] || "";

      if (!fieldValue) {
        validationErrors[
          field.placeholder
        ] = `${field.placeholder} is required`;
        isValid = false;
      }

      let regex = field.regex ? field.regex : null;

      if (regex && regex.startsWith("/") && regex.endsWith("/")) {
        regex = regex.slice(1, -1);
      }

      const regexObj = regex ? new RegExp(regex) : null;

      if (regexObj && !regexObj.test(fieldValue)) {
        validationErrors[field.placeholder] = `Invalid ${field.placeholder}`;
        isValid = false;
      }

      if (field.charLimit && fieldValue.length > field.charLimit) {
        validationErrors[
          field.placeholder
        ] = `${field.placeholder} exceeds ${field.charLimit} character limit`;
        isValid = false;
      }
    });

    setErrors(validationErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    // Fetch existing responses to generate a new ID
    fetch("http://localhost:3001/responses")
      .then((res) => res.json())
      .then((existingResponses) => {
        // Generate the new ID
        const newId =
          existingResponses.length > 0
            ? `RES${String(existingResponses.length + 1).padStart(3, "0")}`
            : "RES001";

        const dataToSubmit = {
          id: newId,
          ...formData,
          formId: formId,
        };

        // Submit the new response
        return fetch("http://localhost:3001/responses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSubmit),
        });
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFormData({});
        setErrors({});
        setIsFormSubmitted(true);
        setTimeout(() => setIsFormSubmitted(false), 3000);
      })
      .catch((err) => console.error("Error saving response:", err));
  };

  return (
    <div className="min-h-screen bg-gray-200 p-6 flex flex-col justify-between">
      <div>
        {/* Top Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          <h1 className="text-xl md:text-2xl font-bold text-blue-800 text-center md:text-left">
            Form Submission
          </h1>
          {/* Form Selector */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <label
                htmlFor="formSelect"
                className="text-sm font-medium text-gray-700"
              >
                Select a Form:
              </label>
              <select
                id="formSelect"
                value={formId || ""}
                onChange={handleFormSelect}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition duration-200 ease-in-out bg-white text-gray-700"
              >
                <option value="" disabled>
                  -- Choose a Form --
                </option>
                {forms.map((form) => (
                  <option key={form.id} value={form.id}>
                    {form.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => navigate("/login")}
              className="bg-gray-700 text-white px-4 py-1 rounded hover:bg-gray-600 h-8 text-sm"
            >
              Login
            </button>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg border border-gray-300">
          <h3 className="text-md font-semibold text-blue-800 mb-4">
            Please fill out the form: {formName}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {formFields.map((field, index) => (
              <div key={index} className="mb-4">
                {field.type === "text" && (
                  <>
                    <label
                      htmlFor={field.placeholder}
                      className="block mb-1 text-gray-600  text-sm"
                    >
                      {field.placeholder}
                    </label>
                    <input
                      type="text"
                      id={field.placeholder}
                      placeholder={field.placeholder}
                      value={formData[field.placeholder] || ""}
                      onChange={(e) => handleInputChange(e, field.placeholder)}
                      className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 h-9 text-sm"
                    />
                    {errors[field.placeholder] && (
                      <p className="text-red-500 text-sm">
                        {errors[field.placeholder]}
                      </p>
                    )}
                  </>
                )}

                {field.type === "date" && (
                  <>
                    <label
                      htmlFor={field.placeholder}
                      className="block mb-2 text-gray-600 text-sm"
                    >
                      {field.placeholder}
                    </label>
                    <input
                      type="date"
                      id={field.placeholder}
                      value={formData[field.placeholder] || ""}
                      onChange={(e) => handleInputChange(e, field.placeholder)}
                      className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 h-9 text-sm"
                    />
                    {errors[field.placeholder] && (
                      <p className="text-red-500 text-sm">
                        {errors[field.placeholder]}
                      </p>
                    )}
                  </>
                )}

                {field.type === "radio" && (
                  <>
                    <label
                      htmlFor={field.placeholder}
                      className="block mb-2 text-gray-600 text-sm"
                    >
                      {field.placeholder}
                    </label>
                    <div className="flex space-x-4">
                      {field.radioOptions.map((option, i) => (
                        <div key={i} className="flex items-center">
                          <input
                            type="radio"
                            id={`option-${i}`}
                            name={field.placeholder}
                            value={option}
                            checked={formData[field.placeholder] === option}
                            onChange={(e) =>
                              handleInputChange(e, field.placeholder)
                            }
                            className="mr-2 text-gray-700"
                          />
                          <label
                            htmlFor={`option-${i}`}
                            className="ml-2 text-gray-600 text-sm"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors[field.placeholder] && (
                      <p className="text-red-500 text-sm">
                        {errors[field.placeholder]}
                      </p>
                    )}
                  </>
                )}
              </div>
            ))}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-700 h-10 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Submit
            </button>

            {/* Success Message */}
            {isFormSubmitted && (
              <div className="bg-green-100 text-green-700 text-center px-4 py-1 rounded mb-4 h-8">
                Form submitted successfully! Thank you.
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-700 text-white text-center py-4 mt-4">
        <p className="text-xs">&copy; 2025 Asif Zia. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default FormSubmit;
