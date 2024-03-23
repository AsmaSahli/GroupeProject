import React from 'react'
import { useSelector} from 'react-redux';
const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 font-semibold text-3xl font-mono'>WELCOME {currentUser.firstName.toUpperCase()}! </h1>
      
    </div>
  )
}

export default Dashboard