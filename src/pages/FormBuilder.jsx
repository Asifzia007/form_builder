// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { logout } from "../features/authSlice";
// import { faList } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// const FormBuilder = () => {
//   const [formName, setFormName] = useState("");
//   const [fieldType, setFieldType] = useState("");
//   const [regex, setRegex] = useState("");
//   const [placeholder, setPlaceholder] = useState("");
//   const [charLimit, setCharLimit] = useState("");
//   const [radioOptions, setRadioOptions] = useState([""]);
//   const [formFields, setFormFields] = useState([]);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Handle adding a new field
//   const handleAddField = () => {
//     const newField = {
//       type: fieldType,
//       regex,
//       placeholder,
//       charLimit,
//       radioOptions,
//     };
//     setFormFields([...formFields, newField]);

//     // Reset field details after adding
//     setFieldType("");
//     setRegex("");
//     setPlaceholder("");
//     setCharLimit("");
//     setRadioOptions([""]);
//   };

//   // Handle saving the form details
//   const handleSave = () => {
//     if (!formName) {
//       alert("Please enter a form name.");
//       return;
//     }

//     // Fetch current forms from db.json to get the highest ID
//     fetch("http://localhost:3001/forms")
//       .then((response) => response.json())
//       .then((data) => {
//         const lastFormId =
//           data.length > 0
//             ? Math.max(
//                 ...data.map((form) => parseInt(form.id.replace("F", "")))
//               )
//             : 0;
//         const newId = `F${String(lastFormId + 1).padStart(3, "0")}`;

//         const formData = {
//           id: newId,
//           name: formName,
//           fields: formFields,
//         };

//         // Send a POST request to save the form data to db.json
//         fetch("http://localhost:3001/forms", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         })
//           .then((response) => response.json())
//           .then((data) => {
//             console.log("Form saved:", data);
//             setFormFields([]);
//             setFormName("");
//           })
//           .catch((error) => {
//             console.error("Error saving form:", error);
//           });
//       })
//       .catch((error) => {
//         console.error("Error fetching forms:", error);
//       });
//   };

//   // Handle adding a new radio option
//   const handleAddRadioOption = () => {
//     setRadioOptions([...radioOptions, ""]);
//   };

//   // Handle radio option input change
//   const handleRadioOptionChange = (index, value) => {
//     const updatedOptions = [...radioOptions];
//     updatedOptions[index] = value;
//     setRadioOptions(updatedOptions);
//   };

//   // Handle logout
//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <div className="w-1/4 bg-gray-800 text-white p-4 flex flex-col justify-between">
//         <div className="mt-3">
//           <h2 className="text-md font-bold mb-4 text-center">
//             Add Input Fields
//           </h2>

//           <div className="mb-4">
//             <div className="space-y-2">
//               <div className="flex items-center bg-gray-100 p-1 rounded hover:bg-gray-200">
//                 <input
//                   type="radio"
//                   id="text"
//                   name="fieldType"
//                   value="text"
//                   checked={fieldType === "text"}
//                   onChange={() => setFieldType("text")}
//                   className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-500"
//                 />
//                 <label
//                   htmlFor="text"
//                   className="text-gray-800 text-sm font-medium cursor-pointer"
//                 >
//                   Text Input
//                 </label>
//               </div>

//               <div className="flex items-center bg-gray-100 p-1 rounded hover:bg-gray-200">
//                 <input
//                   type="radio"
//                   id="date"
//                   name="fieldType"
//                   value="date"
//                   checked={fieldType === "date"}
//                   onChange={() => setFieldType("date")}
//                   className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-500"
//                 />
//                 <label
//                   htmlFor="date"
//                   className="text-gray-800 text-sm font-medium cursor-pointer"
//                 >
//                   Date Picker
//                 </label>
//               </div>

//               <div className="flex items-center bg-gray-100 p-1 rounded hover:bg-gray-200">
//                 <input
//                   type="radio"
//                   id="radio"
//                   name="fieldType"
//                   value="radio"
//                   checked={fieldType === "radio"}
//                   onChange={() => setFieldType("radio")}
//                   className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-500"
//                 />
//                 <label
//                   htmlFor="radio"
//                   className="text-gray-800 text-sm font-medium cursor-pointer"
//                 >
//                   Radio Button
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* Field Details */}
//           <h3 className="text-xs font-bold mb-2">Field Details :</h3>
//           {fieldType && (
//             <>
//               {fieldType === "text" && (
//                 <>
//                   <input
//                     type="text"
//                     placeholder="Regex"
//                     value={regex}
//                     onChange={(e) => setRegex(e.target.value)}
//                     className="border rounded p-1 mb-2 w-full text-black text-sm h-8"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Placeholder"
//                     value={placeholder}
//                     onChange={(e) => setPlaceholder(e.target.value)}
//                     className="border rounded p-1 mb-2 w-full text-black text-sm h-8"
//                   />
//                   <input
//                     type="number"
//                     placeholder="Character Limit"
//                     value={charLimit}
//                     onChange={(e) => setCharLimit(e.target.value)}
//                     className="border rounded p-1 mb-2 w-full text-black text-sm h-8"
//                   />
//                 </>
//               )}

//               {fieldType === "date" && (
//                 <input
//                   type="text"
//                   placeholder="Placeholder"
//                   value={placeholder}
//                   onChange={(e) => setPlaceholder(e.target.value)}
//                   className="border rounded p-1 mb-2 w-full text-black text-sm h-8"
//                 />
//               )}

//               {fieldType === "radio" && (
//                 <>
//                   <input
//                     type="text"
//                     placeholder="Placeholder"
//                     value={placeholder}
//                     onChange={(e) => setPlaceholder(e.target.value)}
//                     className="border rounded p-1 mb-2 w-full text-black text-sm h-8"
//                   />
//                   <div className="mb-2">
//                     <button
//                       onClick={handleAddRadioOption}
//                       className="bg-blue-500 text-white px-2 py-1 rounded w-1/2 text-xs h-6 mb-2"
//                     >
//                       Add Option
//                     </button>
//                     {radioOptions.map((option, index) => (
//                       <div key={index} className="flex items-center mb-2">
//                         <input
//                           type="text"
//                           value={option}
//                           onChange={(e) =>
//                             handleRadioOptionChange(index, e.target.value)
//                           }
//                           className="border rounded p-1 w-full text-black text-sm h-8"
//                           placeholder={`Option ${index + 1}`}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </>
//               )}

//               <button
//                 onClick={handleAddField}
//                 className="bg-green-500 text-white px-4 py-2 rounded w-full text-sm mt-2"
//               >
//                 Add Field
//               </button>
//             </>
//           )}
//         </div>
        
//         <div>
//         <Link to="/form-List">
//     <button className="bg-gray-400 text-white px-4 py-2 rounded mt-4 w-full flex items-center justify-center space-x-2">
//       <FontAwesomeIcon icon={faList} className="text-white" />
//       <span>Form List</span>
//     </button>
//   </Link>
//           {/* Logout Button */}
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 text-white px-4 py-2 rounded mt-4 w-full"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Main Form Section */}
//       <div className="w-3/4 p-4">
//         <div className="flex items-center justify-between bg-gray-500 p-3 rounded mb-4">
//           <input
//             type="text"
//             placeholder="Form Name"
//             value={formName}
//             onChange={(e) => setFormName(e.target.value)}
//             className="border rounded p-1 w-1/4 text-sm text-black bg-gray-100 h-8"
//           />
//           <button
//             onClick={handleSave}
//             className="bg-green-500 text-white px-5 py-1 rounded h-8 text-sm"
//           >
//             Save
//           </button>
//         </div>

//         <h2 className="text-lg font-bold mb-4">Form Details</h2>

//         {formFields.map((field, index) => (
//           <div key={index} className="mb-4">
//             {field.type === "text" && (
//               <input
//                 type="text"
//                 placeholder={field.placeholder}
//                 className="border rounded p-2 mb-2 w-full"
//               />
//             )}
//             {field.type === "date" && (
//                <div>
//               <p className="mb-2 text-sm">{field.placeholder}</p>
//               <input
//                 type="date"
//                 placeholder={field.placeholder}
//                 className="border rounded p-2 mb-2 w-full"
//               />
//               </div>
//             )}
//             {field.type === "radio" && (
//               <div>
//                 <p className="mb-2 text-sm">{field.placeholder}</p>
//                 <div className="flex space-x-4">
//                   {field.radioOptions.map((option, i) => (
//                     <div key={i} className="flex items-center">
//                       <input
//                         type="radio"
//                         id={`option-${i}`}
//                         name={`radio-${index}`}
//                       />
//                       <label htmlFor={`option-${i}`} className="ml-2">
//                         {option}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FormBuilder;


import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/authSlice";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FormBuilder = () => {
  const [formName, setFormName] = useState("");
  const [fieldType, setFieldType] = useState("");
  const [regex, setRegex] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [charLimit, setCharLimit] = useState("");
  const [radioOptions, setRadioOptions] = useState([""]);
  const [formFields, setFormFields] = useState([]);
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const regexOptions = {
    text: /^[a-zA-Z]*$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^(\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/,
    number: /^[0-9]*$/,
    custom: "", 
  };

  // Handle adding a new field
  const handleAddField = () => {
    const newField = {
      type: fieldType,
      regex,
      placeholder,
      charLimit,
      radioOptions,
    };
    setFormFields([...formFields, newField]);

    // Reset field details after adding
    setFieldType("");
    setRegex("");
    setPlaceholder("");
    setCharLimit("");
    setRadioOptions([""]);
  };

  // Handle saving the form details
  const handleSave = () => {
    if (!formName) {
      alert("Please enter a form name.");
      return;
    }

    // Fetch current forms from db.json to get the highest ID
    fetch("http://localhost:3001/forms")
      .then((response) => response.json())
      .then((data) => {
        const lastFormId =
          data.length > 0
            ? Math.max(
                ...data.map((form) => parseInt(form.id.replace("F", "")))
              )
            : 0;
        const newId = `F${String(lastFormId + 1).padStart(3, "0")}`;

        const formData = {
          id: newId,
          name: formName,
          fields: formFields,
        };

        // Send a POST request to save the form data to db.json
        fetch("http://localhost:3001/forms", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Form saved:", data);
            setFormFields([]);
            setFormName("");
            setSuccessMessage("Form saved successfully!"); // Show success message

            // Remove success message after 3 seconds
            setTimeout(() => {
              setSuccessMessage("");
            }, 3000);
          })
          .catch((error) => {
            console.error("Error saving form:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching forms:", error);
      });
  };

  // Handle adding a new radio option
  const handleAddRadioOption = () => {
    setRadioOptions([...radioOptions, ""]);
  };

  // Handle radio option input change
  const handleRadioOptionChange = (index, value) => {
    const updatedOptions = [...radioOptions];
    updatedOptions[index] = value;
    setRadioOptions(updatedOptions);
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-4 flex flex-col justify-between">
        <div className="mt-3">
          <h2 className="text-md font-bold mb-4 text-center">Add Input Fields</h2>

          <div className="mb-4">
            <div className="space-y-2">
              <div className="flex items-center bg-gray-100 p-1 rounded hover:bg-gray-200">
                <input
                  type="radio"
                  id="text"
                  name="fieldType"
                  value="text"
                  checked={fieldType === "text"}
                  onChange={() => setFieldType("text")}
                  className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-500"
                />
                <label
                  htmlFor="text"
                  className="text-gray-800 text-sm font-medium cursor-pointer"
                >
                  Text Input
                </label>
              </div>

              <div className="flex items-center bg-gray-100 p-1 rounded hover:bg-gray-200">
                <input
                  type="radio"
                  id="date"
                  name="fieldType"
                  value="date"
                  checked={fieldType === "date"}
                  onChange={() => setFieldType("date")}
                  className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-500"
                />
                <label
                  htmlFor="date"
                  className="text-gray-800 text-sm font-medium cursor-pointer"
                >
                  Date Picker
                </label>
              </div>

              <div className="flex items-center bg-gray-100 p-1 rounded hover:bg-gray-200">
                <input
                  type="radio"
                  id="radio"
                  name="fieldType"
                  value="radio"
                  checked={fieldType === "radio"}
                  onChange={() => setFieldType("radio")}
                  className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-500"
                />
                <label
                  htmlFor="radio"
                  className="text-gray-800 text-sm font-medium cursor-pointer"
                >
                  Radio Button
                </label>
              </div>
            </div>
          </div>

          {/* Field Details */}
          <h3 className="text-xs font-bold mb-2">Field Details :</h3>
          {fieldType && (
            <>
              {fieldType === "text" && (
                <>
                  <select
                    value={regex}
                    onChange={(e) => setRegex(e.target.value)}
                    className="border rounded p-1 mb-2 w-full text-black text-sm h-8"
                  >
                    <option value="">Select Regex Type</option>
                    <option value={regexOptions.text}>Text</option>
                    <option value={regexOptions.email}>Email</option>
                    <option value={regexOptions.phone}>Phone</option>
                    <option value={regexOptions.number}>Number</option>
                    <option value={regexOptions.custom}>Custom</option>
                  </select>

                  {regex === regexOptions.custom && (
                    <input
                      type="text"
                      placeholder="Custom Regex"
                      value={regex}
                      onChange={(e) => setRegex(e.target.value)}
                      className="border rounded p-1 mb-2 w-full text-black text-sm h-8"
                    />
                  )}

                  <input
                    type="text"
                    placeholder="Placeholder"
                    value={placeholder}
                    onChange={(e) => setPlaceholder(e.target.value)}
                    className="border rounded p-1 mb-2 w-full text-black text-sm h-8"
                  />
                  <input
                    type="number"
                    placeholder="Character Limit"
                    value={charLimit}
                    onChange={(e) => setCharLimit(e.target.value)}
                    className="border rounded p-1 mb-2 w-full text-black text-sm h-8"
                  />
                </>
              )}

              {fieldType === "date" && (
                <input
                  type="text"
                  placeholder="Placeholder"
                  value={placeholder}
                  onChange={(e) => setPlaceholder(e.target.value)}
                  className="border rounded p-1 mb-2 w-full text-black text-sm h-8"
                />
              )}

              {fieldType === "radio" && (
                <>
                  <input
                    type="text"
                    placeholder="Placeholder"
                    value={placeholder}
                    onChange={(e) => setPlaceholder(e.target.value)}
                    className="border rounded p-1 mb-2 w-full text-black text-sm h-8"
                  />
                  <div className="mb-2">
                    <button
                      onClick={handleAddRadioOption}
                      className="bg-blue-500 text-white px-2 py-1 rounded w-1/2 text-xs h-6 mb-2"
                    >
                      Add Option
                    </button>
                    {radioOptions.map((option, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) =>
                            handleRadioOptionChange(index, e.target.value)
                          }
                          className="border rounded p-1 w-full text-black text-sm h-8"
                          placeholder={`Option ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}

              <button
                onClick={handleAddField}
                className="bg-green-500 text-white px-4 py-2 rounded w-full text-sm mt-2"
              >
                Add Field
              </button>
            </>
          )}
        </div>
        
        <div>
          <Link to="/form-List">
            <button className="bg-gray-400 text-white px-4 py-2 rounded mt-4 w-full flex items-center justify-center space-x-2">
              <FontAwesomeIcon icon={faList} className="text-white" />
              <span>Form List</span>
            </button>
          </Link>
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded mt-4 w-full"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Form Section */}
      <div className="w-3/4 p-4">


        <div className="flex items-center justify-between bg-gray-500 p-3 rounded mb-4">
          <input
            type="text"
            placeholder="Form Name"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            className="border rounded p-1 w-1/4 text-sm text-black bg-gray-100 h-8"
          />
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-5 py-1 rounded h-8 text-sm"
          >
            Save
          </button>
        </div>

        <h2 className="text-lg font-bold mb-4 text-gray-700">Form Details</h2>
        {/* Show success message */}
        {successMessage && (
          <div className="bg-green-100 text-green-700 w-1/3 text-center px-4 py-1 rounded mb-4 h-8">
            {successMessage}
          </div>
        )}
        {formFields.map((field, index) => (
          <div key={index} className="mb-4">
            {field.type === "text" && (
              <input
                type="text"
                placeholder={field.placeholder}
                className="border rounded p-2 mb-2 w-full"
              />
            )}
            {field.type === "date" && (
               <div>
              <p className="mb-2 text-sm">{field.placeholder}</p>
              <input
                type="date"
                placeholder={field.placeholder}
                className="border rounded p-2 mb-2 w-full"
              />
              </div>
            )}
            {field.type === "radio" && (
              <div>
                <p className="mb-2 text-sm">{field.placeholder}</p>
                <div className="flex space-x-4">
                  {field.radioOptions.map((option, i) => (
                    <div key={i} className="flex items-center">
                      <input
                        type="radio"
                        id={`option-${i}`}
                        name={`radio-${index}`}
                      />
                      <label htmlFor={`option-${i}`} className="ml-2">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormBuilder;
