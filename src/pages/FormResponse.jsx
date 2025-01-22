import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {fetchFormResponse} from "../features/FormBuilderSlice"

const FormResponse = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const responses = useSelector((state) =>
    state.formBuilder.responses.filter(
      (response) => String(response.formId) === String(formId)
    )
  );

  const fetchStatus = useSelector((state) => state.formBuilder.fetchStatus);

  useEffect(() => {
    if (fetchStatus === "idle") {
      dispatch(fetchFormResponse());
    }
  }, [dispatch, fetchStatus]);

  const headers = responses.length > 0 ? Object.keys(responses[0]) : [];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-bold text-blue-800 uppercase">
          Responses for Form {formId}
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white px-4 py-1 rounded shadow hover:bg-blue-500 text-sm h-8"
        >
          Back
        </button>
      </div>

      {responses.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white shadow-md rounded border border-gray-200">
            <thead>
              <tr className="bg-gray-600 text-white text-xs">
                {headers.map((header) => (
                  <th key={header} className="px-4 py-2 capitalize text-left">
                    {header.replace(/_/g, " ")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {responses.map((response) => (
                <tr
                  key={response.id}
                  className="hover:bg-gray-100 transition-all border-b text-sm"
                >
                  {headers.map((header) => (
                    <td
                      key={`${response.id}-${header}`}
                      className="px-4 py-2 text-gray-700"
                    >
                      {response[header] || "N/A"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">
          No responses available for this form.
        </p>
      )}
    </div>
  );
};

export default FormResponse;

