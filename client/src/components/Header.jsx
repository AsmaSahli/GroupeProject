import { Button, Navbar,Dropdown,Avatar} from 'flowbite-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';




    const Header = () => {

    const path = useLocation().pathname;
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    
    const handleSignout = async () => {
        try {
        const res = await fetch('http://localhost:8000/signout', {
            method: 'POST',
        });
        const data = await res.json();
        if (!res.ok) {
            console.log(data.message);
        } else {
            dispatch(signoutSuccess());
        }
        } catch (error) {
        console.log(error.message);
        }
    };

    return (
        <Navbar className='border-b-2'>
        <Link  className='self-center whitespace-nowrap text-sm sm:text-2xl font-bold dark:text-white'>
            <span className='font-mono'>Chore Tracker</span>
        </Link>
        <div className='flex gap-2 md:order-2'>


            {currentUser ? (
            <Dropdown
                arrowIcon={false}
                inline
                label={
                <Avatar alt='user' img={currentUser.profilePicture} rounded />
                }
            >
                <Dropdown.Header>
                <span className='block text-sm'>@{currentUser.username}</span>
                <span className='block text-sm font-medium truncate'>
                    {currentUser.email}
                </span>
                </Dropdown.Header>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleSignout}>Logout</Dropdown.Item>
            </Dropdown>
            )

            :(
            <Link to='/signin'>
            <Button gradientMonochrome="failure" outline>
                <FaSignInAlt /> SignIn
            </Button>
            </Link>)}
            <Navbar.Toggle />
            
        </div>

        {currentUser ? (
                <Navbar.Collapse>
                    <Navbar.Link active={path === '/dashboard'} as={'div'} className={`active-link ${path === '/dashboard' ? 'bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent' : ''}`}>
                        <Link to='/dashboard'>Dashboard</Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === '/addJob'} as={'div'} className={`active-link ${path === '/addJob' ? 'bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent' : ''}`}>
                        <Link to='/addJob'>Add a Job</Link>
                    </Navbar.Link>
                </Navbar.Collapse>
            ) : 
                null}
        </Navbar>
    );
};

export default Header;
