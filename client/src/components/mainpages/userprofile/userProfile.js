import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
import './userProfile.css';
import ShopCategories from '../../shopcategory/ShopCategories';

function UserProfile() {
    const state = useContext(GlobalState)
  
    const [user] = state.userAPI.user;
    const [userData, setUserData] = useState(null);

    return (
        <div>
            <div className="profile-container">
                <h2>User Profile</h2>
                <div className="profile-details">
                    <div className="user-data">
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Membership:</strong> </p>
                    </div>
                </div>
                <div className="user-actions">
                    <Link style={{backgroundColor: '#6A9738', borderRadius: '5px', padding: '12px 20px 12px 20px', color: 'white'}} to= ''>Edit Profile</Link>
                    <Link style={{backgroundColor: '#6A9738', borderRadius: '5px', padding: '12px 20px 12px 20px', color: 'white'}} to= ''>Change Password</Link>
                    <Link style={{backgroundColor: '#6A9738', borderRadius: '5px', padding: '12px 20px 12px 20px', color: 'white'}} to= '/orders'>View Orders</Link>
                    <Link style={{backgroundColor: '#6A9738', borderRadius: '5px', padding: '12px 20px 12px 20px', color: 'white'}} to= ''>Manage Addresses</Link>
                </div>
            </div>
            <ShopCategories />
        </div>
    );
}

export default UserProfile;
