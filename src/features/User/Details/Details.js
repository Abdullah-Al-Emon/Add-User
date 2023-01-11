import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { FacebookShareButton } from 'react-share';
import './Details.css'

const Details = () =>
{
    const details = useLoaderData();
    const { first_name, last_name, user_type, division, district, id } = details;

    return (
        <div className='details'>
            <h3>Name: {first_name} {last_name}</h3>
            <p>User Type: {user_type}</p>
            <p>Division: {division}</p>
            
            <p>District: {district}</p>
            <div className='flex'>
                <button className='btn-details'>
                    <FacebookShareButton url='https://lovely-mochi-3d8b3c.netlify.app/' quote='Hey share my page' hashtag="#Share my page">
                        Share
                    </FacebookShareButton>
                </button>
                <button className='btn-details'>
                    <Link to='/updateUsers' state={{ first_name, last_name, user_type, division, district, id }}>Edit</Link>
                </button>
            </div>
        </div>
    );
};

export default Details;