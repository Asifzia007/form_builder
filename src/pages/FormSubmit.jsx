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
    fetch("http://localhost:3001/forms")
      .then((res) => res.json())
      .then((data) => {
        setForms(data);
        if (data.length > 0) {
          setFormId(data[0].id); 
          setFormName(data[0].name); 
          setFormFields(data[0].fields); 
        }
      })
      .catch((err) => {
        console.error("Error fetching forms:", err);
      });
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

  const handleRadioChange = (e, field) => {
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
        validationErrors[field.placeholder] = `${field.placeholder} is required`;
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
        validationErrors[field.placeholder] = `${field.placeholder} exceeds ${field.charLimit} character limit`;
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

    const dataToSubmit = {
      ...formData,
      formId: formId,
    };

    // Send form response to the backend (db.json)
    fetch("http://localhost:3001/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSubmit),
    })
      .then((res) => res.json())
      .then((data) => {
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800">Form Submission</h1>
             {/* Form Selector */}
             <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <label htmlFor="formSelect" className="text-sm text-gray-600">
            Select a Form
          </label>
          <select
            id="formSelect"
            value={formId || ""}

            onChange={handleFormSelect}
            className="px-4 py-1 border border-gray-500 rounded-md text-sm h-8"
          >
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

        <h3 className="text-md font-semibold text-gray-700 mb-4">
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
                    <p className="text-red-500 text-sm">{errors[field.placeholder]}</p>
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
                    <p className="text-red-500 text-sm">{errors[field.placeholder]}</p>
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
                            handleRadioChange(e, field.placeholder)
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
                    <p className="text-red-500 text-sm">{errors[field.placeholder]}</p>
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



// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const FormSubmit = () => {
//   const [formData, setFormData] = useState({});
//   const [formFields, setFormFields] = useState([]);
//   const [response, setResponse] = useState(null);
//   const [formId, setFormId] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [isFormSubmitted, setIsFormSubmitted] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch("http://localhost:3001/forms")
//       .then((res) => res.json())
//       .then((data) => {
//         const forms = data;
//         const form = forms.find((form) => form.id === "F001");
//         if (form) {
//           setFormFields(form.fields);
//           setFormId(form.id);
//         } else {
//           console.log("Form with id F001 not found!");
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching data:", err);
//       });
//   }, []);

//   const handleInputChange = (e, field) => {
//     const { value } = e.target;
//     setFormData({
//       ...formData,
//       [field]: value,
//     });
//   };

//   const handleRadioChange = (e, field) => {
//     const { value } = e.target;
//     setFormData({
//       ...formData,
//       [field]: value,
//     });
//   };

//   const validateForm = () => {
//     let validationErrors = {};
//     let isValid = true;

//     formFields.forEach((field) => {
//       const fieldValue = formData[field.placeholder] || "";

//       if (!fieldValue) {
//         validationErrors[
//           field.placeholder
//         ] = `${field.placeholder} is required`;
//         isValid = false;
//       }

//       let regex = field.regex ? field.regex : null;

//       if (regex && regex.startsWith("/") && regex.endsWith("/")) {
//         regex = regex.slice(1, -1);
//       }

//       const regexObj = regex ? new RegExp(regex) : null;

//       if (regexObj && !regexObj.test(fieldValue)) {
//         validationErrors[field.placeholder] = `Invalid ${field.placeholder}`;
//         isValid = false;
//       }

//       if (field.charLimit && fieldValue.length > field.charLimit) {
//         validationErrors[
//           field.placeholder
//         ] = `${field.placeholder} exceeds ${field.charLimit} character limit`;
//         isValid = false;
//       }
//     });

//     setErrors(validationErrors);
//     return isValid;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       return;
//     }

//     const dataToSubmit = {
//       ...formData,
//       formId: formId,
//     };

//     // Send form response to the backend (db.json)
//     fetch("http://localhost:3001/responses", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(dataToSubmit),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setResponse(data);
//         setFormData({});
//         setErrors({});
//         setIsFormSubmitted(true);
//         setTimeout(() => setIsFormSubmitted(false), 3000);
//       })
//       .catch((err) => console.error("Error saving response:", err));
//   };

//   return (
//     <div className="min-h-screen bg-gray-200 p-6 flex flex-col justify-between">
//       {/* Top Navigation */}
//       <div>
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-blue-800">Form Submission</h1>

//         <button
//           onClick={() => navigate("/login")}
//           className="bg-gray-700 text-white px-4 py-1 rounded hover:bg-gray-600 h-8 text-sm"
//         >
//           Login
//         </button>
//       </div>

//       {/* Form Section */}
//       <div className="w-full max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg border border-gray-300">
//         <h3 className="text-md font-semibold text-gray-700 mb-4">
//           Please fill out the form
//         </h3>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {formFields.map((field, index) => (
//             <div key={index} className="mb-4">
//               {field.type === "text" && (
//                 <>
//                   <label
//                     htmlFor={field.placeholder}
//                     className="block mb-1 text-gray-600  text-sm"
//                   >
//                     {field.placeholder}
//                   </label>
//                   <input
//                     type="text"
//                     id={field.placeholder}
//                     placeholder={field.placeholder}
//                     value={formData[field.placeholder] || ""}
//                     onChange={(e) => handleInputChange(e, field.placeholder)}
//                     className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 h-9 text-sm"
//                   />
//                   {errors[field.placeholder] && (
//                     <p className="text-red-500 text-sm">
//                       {errors[field.placeholder]}
//                     </p>
//                   )}
//                 </>
//               )}

//               {field.type === "date" && (
//                 <>
//                   <label
//                     htmlFor={field.placeholder}
//                     className="block mb-2 text-gray-600  text-sm"
//                   >
//                     {field.placeholder}
//                   </label>
//                   <input
//                     type="date"
//                     id={field.placeholder}
//                     value={formData[field.placeholder] || ""}
//                     onChange={(e) => handleInputChange(e, field.placeholder)}
//                     className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 h-9 text-sm"
//                   />
//                   {errors[field.placeholder] && (
//                     <p className="text-red-500 text-sm">
//                       {errors[field.placeholder]}
//                     </p>
//                   )}
//                 </>
//               )}

//               {field.type === "radio" && (
//                 <>
//                   <label
//                     htmlFor={field.placeholder}
//                     className="block mb-2 text-gray-600  text-sm"
//                   >
//                     {field.placeholder}
//                   </label>
//                   <div className="flex space-x-4">
//                     {field.radioOptions.map((option, i) => (
//                       <div key={i} className="flex items-center">
//                         <input
//                           type="radio"
//                           id={`option-${i}`}
//                           name={field.placeholder}
//                           value={option}
//                           checked={formData[field.placeholder] === option}
//                           onChange={(e) =>
//                             handleRadioChange(e, field.placeholder)
//                           }
//                           className="mr-2 text-gray-700"
//                         />
//                         <label
//                           htmlFor={`option-${i}`}
//                           className="ml-2 text-gray-600  text-sm"
//                         >
//                           {option}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                   {errors[field.placeholder] && (
//                     <p className="text-red-500 text-sm">
//                       {errors[field.placeholder]}
//                     </p>
//                   )}
//                 </>
//               )}
//             </div>
//           ))}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-700 h-10 focus:outline-none focus:ring-2 focus:ring-gray-400"
//           >
//             Submit
//           </button>

//           {/* Success Message */}
//           {isFormSubmitted && (
//             <div className="bg-green-100 text-green-700 text-center px-4 py-1 rounded mb-4 h-8">
//               Form submitted successfully! Thank you.
//             </div>
//           )}
//         </form>
//       </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-gray-700 text-white text-center py-4 mt-4">
//         <p className="text-xs">&copy; 2025 Asif Zia. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default FormSubmit;
