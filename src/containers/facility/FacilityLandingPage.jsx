import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../../reactcontext/ReactContext'
import { Link, useNavigate } from 'react-router-dom'
import FacilityTableInit from './tables/FacilityTableInit'


const FacilityLandingPage = () => {
  const [selected, setSelected] = useState({})
  const { loginInfo } = useContext(LoginContext)
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(1);
 

  // Define tab content
  const tabContent = [
    { title: 'Create Facility', content: <div>Add facility</div> },
    { title: 'Lists Facilities', content: <FacilityTableInit setActiveTab={setActiveTab} setSelected={setSelected}/> },
    { title: 'Facility Info', content: <div>Facility details</div>   
    },

  ];

  useEffect(() => {

    !loginInfo.loginStatus && navigate("/")
    
  }, [loginInfo])
  
  // Handle tab change
  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  return (
   <div className='w-full flex h-full flex-col items-center justify-between relative gap-3'>
      <div className='self-start'>
        <Link
        to={'/dashboard'}
        className='text-yellow-700'>
          Dashboard
        </Link> 
        {' > '} 

        { 
          //parsedAgentData.name + " "
        }
        Facilities

      </div>
      <div className='text-lg font-bold'>
        All Facilities
      </div>
      {/* Render tab buttons */}
      <div className='w-full flex flex-wrap justify-evenly mt-3 border-b-2 border-b-gray-300 rounded-lg bg-gray-100 p-2'>
        {tabContent.map((tab, index) => (
          <>
            {tab.title.length > 0 &&
              <button
                key={index}
                onClick={() => handleTabChange(index)}
                className={activeTab === index ? 'border-2 border-black md:text-[14pt] text-[11pt] bg-gray-300 px-4  text-black p-2 rounded-2xl m-1':
                'border-2 shadow-lg border-white rounded-2xl md:p-3 p-1'}
              >
                {tab.title}
              </button>
            } 
           
          </>
         
        ))}
      </div>

      {/* Render active tab content */}
      <div className='w-full p-2 flex items-center justify-center h-full'>
        {tabContent[activeTab].content}
      </div>

    </div>
  )
}

export default FacilityLandingPage