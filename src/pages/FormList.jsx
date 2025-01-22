import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFormBuilder, fetchFormResponse } from "../features/FormBuilderSlice";

const FormList = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {forms} = useSelector((state) => state.formBuilder);
  const{responses}= useSelector((state) => state.formBuilder);

  useEffect(()=>{
    dispatch(fetchFormBuilder())
    dispatch(fetchFormResponse())

  },[dispatch])

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
    navigate('/form-builder');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-bold text-blue-800 text-center uppercase">
          Form List
        </h1>
        <button
          onClick={handleBack}
          className="bg-blue-600 text-white px-4 py-1 rounded shadow hover:bg-blue-500 text-sm h-8"
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
    className="bg-blue-100 text-blue-800 px-3 py-1 rounded hover:bg-blue-500 hover:text-white text-xs flex items-center space-x-1 border border-blue-600"
  >

    <span>View</span>
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