
import { Button, Card } from 'flowbite-react';
import React, { useState ,useEffect } from 'react'
import { useNavigate , useParams } from 'react-router-dom';

const ViewJob = () => {
  const [error, setError] = useState(null);
  const [job, setJob] = useState(null);
  const { jobId } = useParams();
  useEffect(() => {

    const fetchJobDetails = async () => {
    try {
        const res = await fetch(`http://localhost:8000/getOneJob/${jobId}`, {
        method: 'GET',
        credentials: 'include',
        });
        const data = await res.json();

        if (!res.ok) {
        setError(data.message);
        return;
        }

        setJob(data);
    } catch (error) {
        setError('Something went wrong');
    }
    };

    fetchJobDetails();
}, [jobId]);

  return (
    <div className='max-w-md mx-auto p-3'>
      <Button gradientMonochrome="lime" outline>Add to My Jobs</Button>
      <br />
    {job&& (
        <Card>

        <div className='mt-4'>
            <h1 className='text-xl font-semibold'>{job.title}</h1>
            <h3 className='text-gray-500'>{job.description}</h3>
            <h3 className='text-gray-500'> Location : {job.location}</h3>
            <br />
            <h4 className='text-gray-500'>Posted By:{job.addedBy}</h4>
            <h4 className='text-gray-500'>Posted On: {new Date(job.createdAt).toLocaleString()}</h4>
        </div>



        </Card>
    )}
    </div>
  )
}

export default ViewJob