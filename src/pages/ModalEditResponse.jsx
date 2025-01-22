// import React from "react";

// const ModalEditResponse = ({
//   isOpen,
//   selectedResponse,
//   formFields,
//   handleCloseModal,
//   handleModalInputChange,
//   handleUpdate,
// }) => {
//   if (!isOpen || !selectedResponse) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
//       <div className="bg-white p-6 rounded shadow-lg w-96">
//         <h2 className="text-lg font-bold text-gray-700 mb-4">Edit Response</h2>
//         <div className="space-y-2">
//           {formFields.map((field, index) => (
//             <div key={index} className="mb-4">
//               {field.type === "text" && (
//                 <>
//                   <label htmlFor={field.placeholder} className="block mb-1">
//                     {field.placeholder}
//                   </label>
//                   <input
//                     type="text"
//                     id={field.placeholder}
//                     placeholder={field.placeholder}
//                     value={selectedResponse[field.placeholder] || ""}
//                     onChange={(e) =>
//                       handleModalInputChange(e, field.placeholder)
//                     }
//                     className="w-full p-2 border border-gray-300 rounded"
//                   />
//                 </>
//               )}

//               {field.type === "date" && (
//                 <>
//                   <label htmlFor={field.placeholder} className="block mb-2">
//                     {field.placeholder}
//                   </label>
//                   <input
//                     type="date"
//                     id={field.placeholder}
//                     value={selectedResponse[field.placeholder] || ""}
//                     onChange={(e) =>
//                       handleModalInputChange(e, field.placeholder)
//                     }
//                     className="w-full p-2 border border-gray-300 rounded"
//                   />
//                 </>
//               )}

//               {field.type === "radio" && (
//                 <>
//                   <label htmlFor={field.placeholder} className="block mb-2">
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
//                           checked={selectedResponse[field.placeholder] === option}
//                           onChange={(e) =>
//                             handleModalInputChange(e, field.placeholder)
//                           }
//                           className="mr-2"
//                         />
//                         <label htmlFor={`option-${i}`} className="ml-2">
//                           {option}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                 </>
//               )}
//             </div>
//           ))}
//         </div>
//         <div className="mt-4 flex justify-between">
//           <button
//             onClick={handleCloseModal}
//             className="bg-gray-600 text-white px-4 py-2 rounded shadow hover:bg-gray-700 text-sm"
//           >
//             Close
//           </button>
//           <button
//             onClick={handleUpdate}
//             className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 text-sm"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ModalEditResponse;
