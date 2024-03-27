import { useSelector} from 'react-redux';
import React, { useState ,useEffect } from 'react'
import { useNavigate , useParams } from 'react-router-dom';
import { Alert, Button, Textarea,TextInput } from 'flowbite-react';

const EditJob = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [error, setError] = useState(null);
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
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

            setTitle(data.title);
            setDescription(data.description);
            setLocation(data.location);
        } catch (error) {
            setError('Something went wrong');
        }
        };

        fetchJobDetails();
    }, [jobId]);
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
        const res = await fetch(`http://localhost:8000/updateJob/${jobId}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            description: description,
            location: location,
            title: title,
        
                }),
                credentials: 'include',
            });
            const data = await res.json();
        
            if (!res.ok) {
                setError(data.message);
                return;
            }
        
            setError(null);
            } catch (error) {
            setError('Something went wrong');
            }
        };

    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='text-center text-3xl my-7 font-semibold font-mono'>Add a Job</h1>
        <form className='flex flex-col gap-4'onSubmit={handleUpdate}>
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
                Update
            </Button>
            {error && (
                <Alert className='mt-5' color='failure'>
                    {error}
                </Alert>
        )}
        </form> 
        </div>
    )
}

export default EditJob