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
                <FacebookShareButton className='' url='https://lovely-mochi-3d8b3c.netlify.app/' quote={"Contact with Me"} hashtag="#Share-my-page">
                    <button className='up-btn-dt'>
                        Share
                    </button>
                </FacebookShareButton>
                <button className='btn-dt'>
                    <Link to='/updateUsers' state={{ first_name, last_name, user_type, division, district, id }}>Edit</Link>
                </button>
            </div>
        </div>
    );
};

export default Details;