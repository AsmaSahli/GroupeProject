import React from 'react';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import chore from '../assets/choreTracker.png'




    const SignUp = () => {
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
        return setErrorMessage('Please fill out all fields.');
        }

        if (formData.password.length < 6) {
            return setErrorMessage('Password must be at least 6 characters.');
        }
        if (formData.password !== formData.confirmPassword) {
            return setErrorMessage('Password and Confirm Password must match.');
        }
        try {
        setLoading(true);
        setErrorMessage(null);
    
        const res = await fetch('http://localhost:8000/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
    
        if (!res.ok) {
            throw new Error('Sign up failed');
        }
    
        const data = await res.json();
    
        if (data.success === false) {
            return setErrorMessage(data.message);
        }
    
        setLoading(false);
    
        if (res.status === 200) {
            navigate('/signin');
        }
        } catch (error) {
        console.error(error);
        setErrorMessage('Email is already in use. Please use a different email');
        setLoading(false);
        }
    };


    return (
        <div className='min-h-screen mt-20'>
        <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
            {/* left */}
            <div className='flex-1'>
            <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='font-mono'>Chore Tracker</span>
            </Link>
            <img src={chore} alt="" />
            </div>
            {/* right */}

            <div className='flex-1'>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <div>
                <Label value='Your firstname' />
                <TextInput
                    type='text'
                    placeholder='firstName'
                    id='firstName'
                    onChange={handleChange}
                />
                </div>
                <div>
                <Label value='Your lastname' />
                <TextInput
                    type='text'
                    placeholder='LastName'
                    id='lastName'
                    onChange={handleChange}
                />
                </div>
                <div>
                <Label value='Your email' />
                <TextInput
                    type='email'
                    placeholder='name@company.com'
                    id='email'
                    onChange={handleChange}
                />
                </div>
                <div>
                <Label value='Your password' />
                <TextInput
                    type='password'
                    placeholder='Password'
                    id='password'
                    onChange={handleChange}
                />
                </div>
                <div>
                <Label value='confirm Password' />
                <TextInput
                    type='password'
                    placeholder='confirm Password'
                    id='confirmPassword'
                    onChange={handleChange}
                />
                </div>
                <Button
                gradientMonochrome="failure"
                type='submit'
                disabled={loading}
                >
                {loading ? (
                    <>
                    <Spinner size='sm' />
                    <span className='pl-3'>Loading...</span>
                    </>
                ) : (
                    'Sign Up'
                )}
                </Button>

                
            </form>
            <div className='flex gap-2 text-sm mt-5'>
                <span>Have an account?</span>
                <Link to='/signin' className='text-blue-500'>
                Sign In
                </Link>
            </div>
            {errorMessage && (
                <Alert className='mt-5' color='failure'>
                {errorMessage}
                </Alert>
            )}
            </div>
        </div>

        </div>
    );
}

export default SignUp;
