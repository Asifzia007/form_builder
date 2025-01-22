import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FormList = () => {
  const [forms, setForms] = useState([]);
  const [responses, setResponses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/forms")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Forms:", data);
        setForms(data);
      })
      .catch((err) => console.error("Error fetching forms:", err));

    fetch("http://localhost:3001/responses")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Responses:", data);
        setResponses(data);
      })
      .catch((err) => console.error("Error fetching responses:", err));
  }, []);

  const countResponses = (formId) => {
    const filteredResponses = responses.filter(
      (response) => String(response.formId) === String(formId)
    );
    return filteredResponses.length;
  };

  const handleView = (formId) => {
    navigate(`/form-response/${formId}`);
  };

  const handleBack = () => {
    navigate('/form-builder'); // Navigate to /form-builder
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-bold text-gray-700 text-center uppercase">
          Form List
        </h1>
        <button
          onClick={handleBack}
          className="bg-gray-600 text-white px-4 py-2 rounded shadow hover:bg-gray-700 text-sm"
        >
          Back
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded border border-gray-200">
          <thead>
            <tr className="bg-gray-600 text-white text-xs">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-center">Responses</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form) => (
              <tr
                key={form.id}
                className="border-b hover:bg-gray-50 transition-all text-sm"
              >
                <td className="px-4 py-2 text-gray-700">{form.id}</td>
                <td className="px-4 py-2 text-gray-800">{form.name}</td>
                <td className="px-4 py-2 text-center text-gray-800">
                  {countResponses(form.id)}
                </td>
                <td className="px-4 py-2 flex justify-center space-x-2">
                  <button
                    onClick={() => handleView(form.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormList;