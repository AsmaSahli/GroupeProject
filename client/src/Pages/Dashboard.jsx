import React, { useState ,useEffect } from 'react'
import { useSelector} from 'react-redux';
import { Table ,Button ,Alert} from 'flowbite-react';
import { Link,  } from 'react-router-dom';
const Dashboard = () => {

  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [job, setJob] = useState([]);
  const fetchJobs = async () => {
    try {
      const res = await fetch('http://localhost:8000/getAllJobs', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        return;
      }
      setJobs(data); 
    } catch (error) {
      setError('Something went wrong');
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);
  const handleDelete = async (jobId) => {
    try {
        const res = await fetch(`http://localhost:8000/deleteJob/${jobId}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (!res.ok) {
            const data = await res.json();
            setError(data.message);
            return;
        }

        setError(null);
        await fetchJobs()
    } catch (error) {
        setError('Something went wrong');
    }
};


  return (
    <>

    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 font-semibold text-3xl font-mono'>WELCOME {currentUser.firstName.toUpperCase()}! </h1>
      {error && (
          <Alert className='mt-5' color='failure'>
            {error}
          </Alert>
    )}
      </div>

      <div className='flex p-3 max-w-5xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
      <div className='flex-1'>
      <Table hoverable className='shadow-md'>
      <Table.Head>
        <Table.HeadCell>Jobs</Table.HeadCell>
        <Table.HeadCell>Location</Table.HeadCell>
        <Table.HeadCell>Action</Table.HeadCell>
      </Table.Head>
      <Table.Body className='divide-y'>
      {jobs.map((jobItem) => (
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={jobItem._id}>
                        <Table.Cell>{jobItem.title}</Table.Cell>
                        <Table.Cell>{jobItem.location}</Table.Cell>
                        <Table.Cell>
                      <div className="flex gap-2">
                        <Link><Button gradientMonochrome="lime" outline size="xs">View</Button></Link>
                        <Link><Button gradientMonochrome="success" outline size="xs">Add </Button></Link>
                        <Link><Button gradientMonochrome="teal" outline size="xs">Edit</Button></Link>
                        <Button gradientMonochrome="failure" outline size="xs" onClick={() => handleDelete(jobItem._id)}>Cancel</Button>
                      </div>
                        </Table.Cell>
                    </Table.Row>
                ))}

      </Table.Body>
      </Table>

        
      </div>
      {/* right */}
      <div className='flex-2'>
      <Table hoverable className='shadow-md'>
      <Table.Head>
        <Table.HeadCell> My Jobs</Table.HeadCell>
        <Table.HeadCell>Action</Table.HeadCell>
      </Table.Head>
      <Table.Body className='divide-y'>
      {job.map((jobItem) => (
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={jobItem._id}>
                        <Table.Cell></Table.Cell>
                        <Table.Cell>
                        <div className="flex gap-2">
                          <Link><Button gradientMonochrome="lime" outline size="xs">View</Button></Link>
                          <Button gradientMonochrome="failure" outline size="xs" onClick={() => handleDelete(jobItem._id)}>Done</Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                ))}

      </Table.Body>
      </Table>

      </div>

      </div>

      </>
      
    
  )
}

export default Dashboard