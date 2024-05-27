import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { LoginContext } from '../../../reactcontext/ReactContext';

const FacilityTableInit = ({ setActiveTab, setSelected }) => {
  const apiUrl = 'http://localhost:3001';
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { loginInfo } = useContext(LoginContext);
  const navigate = useNavigate();

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
        swal({
          title: "Error",
          icon: "error",
          text: res.data.error,
        });
      } else {
        setFacilities(res.data);
      }
      setLoading(false);
    })
    .catch(err => {
      swal({
        title: "Error",
        icon: "error",
        text: err.message,
      });
      setLoading(false);
    });
  }, [apiUrl]);

  const filteredFacilities = facilities.filter(row =>
    Object.values(row).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="w-full h-full overflow-auto">
      <div className="w-full flex justify-center items-center mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-2 p-2 text-center border-black w-full md:w-1/3"
          placeholder="Search..."
        />
      </div>
      <hr />
      {loading ? (
        <p className="w-full h-full text-center text-lg py-5">Fetching results ... Please wait</p>
      ) : filteredFacilities.length === 0 ? (
        <div className="w-full text-center text-lg py-5 gap-y-10 flex flex-col justify-center items-center">
          <p>{"No facilities found."}</p>
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
              {filteredFacilities.map((row, index) => (
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
