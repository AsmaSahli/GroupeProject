
import { useSelector} from 'react-redux';
import React, { useState  } from 'react'
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Textarea,TextInput } from 'flowbite-react';

const AddJob = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [publishError, setPublishError] = useState(null);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/addJob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: description,
          location: location,
          title: title,
          userId: currentUser._id,
          
        }),
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
  
  
      if (res.ok) {
        setPublishError(null);
        navigate('/dashboard')


      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
    <h1 className='text-center text-3xl my-7 font-semibold font-mono'>Add a Job</h1>
    <form className='flex flex-col gap-4'onSubmit={handleSubmit}>
    <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            value={title}
            className='flex-1'
            onChange={(e) => setTitle(e.target.value)}
    />
    <Textarea id="comment" placeholder="Write something..." required rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
    <TextInput
            type='text'
            placeholder='Location'
            required
            id='location'
            value={location}
            className='flex-1'
            onChange={(e) => setLocation(e.target.value)}
    />
    <Button type='submit' gradientMonochrome="success" outline>
          Submit
    </Button>
    {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
    )}
    </form> 
    </div>
  )
}

export default AddJob