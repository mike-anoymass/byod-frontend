import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { COLUMNS } from './columns';
import { LoginContext } from '../../../reactcontext/ReactContext';
import axios from 'axios';
import swal from 'sweetalert';
import FacilityTable from './FacilityTable';

const FacilityTableInit = ({ setActiveTab, setSelected }) => {
  const apiUrl = 'http://localhost:3001';
  const [facilities, setFacilities] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const { loginInfo } = useContext(LoginContext);
  const navigate = useNavigate();
  const columns = useMemo(() => COLUMNS, []);

  useEffect(() => {
    setSelected({});
    if (!loginInfo.loginStatus) {
      navigate("/");
    }
  }, [loginInfo, navigate, setSelected]);

  useEffect(() => {
    axios.get(`${apiUrl}/facility/facilities`, {
      headers: {
        loginToken: localStorage.getItem("loginToken"),
      },
    })
    .then(res => {
      if (res.data.error) {
        setErrorMessage(res.data.error);
      } else {
        setFacilities(res.data);
      }
      setLoading(false);
    })
    .catch(err => {
      swal({
        title: "Error",
        icon: "error",
        text: JSON.stringify(err.message),
      });
      setLoading(false);
    });
  }, [apiUrl]);

  return (
    <div className="w-full h-full overflow-auto">
      <hr />
      {loading ? (
        <p className="w-full h-full text-center text-lg py-5">Fetching results ... Please wait</p>
      ) : facilities.length === 0 ? (
        <div className="w-full text-center text-lg py-5 gap-y-10 flex flex-col justify-center items-center">
          <p>{"You need to create a profile"}</p>
          <button
            onClick={() => setActiveTab(0)}
            className="py-4 font-light text-white px-5 border-2 rounded-xl bg-black-gradient font-poppins"
          >
            Create a facility
          </button>
        </div>
      ) : (
        <div className="w-full overflow-auto p-4 bg-white shadow-md rounded-lg">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-gray-600">Facility code</th>
              <th className="px-4 py-2 text-gray-600">Facility name</th>
              <th className="px-4 py-2 text-gray-600">District</th>
              <th className="px-4 py-2 text-gray-600">Owner</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {facilities.map((row, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="whitespace-nowrap px-4 py-2">{row.facility_code}</td>
                <td className="whitespace-nowrap px-4 py-2">{row.facility_name}</td>
                <td className="whitespace-nowrap px-4 py-2">{row.District?.district_name}</td>
                <td className="whitespace-nowrap px-4 py-2">{row.Owner?.facility_owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
};

export default FacilityTableInit;
