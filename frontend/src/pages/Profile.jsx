import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [userId, setUserId] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            const decodedUser = jwtDecode(token);  
            const userId = decodedUser.user.id; 
            setUserId(userId); 

            const fetchUserData = async () => {
                try {
                    // const response = await axios.get(`https://omnimart.up.railway.app/api/auth/getuser/${userId}`);
                    const response = await axios.get(`${import.meta.env.VITE_APP_URL}/api/auth/getuser/${userId}`);
                    setUserData(response.data);
                    // console.log(response.data);
                } catch (err) {
                    console.log(err);
                }
            };
            fetchUserData();
        } else {
            console.log("No token found");
        }
    }, [token]); 

    if (!userData) {
        return <div className="text-gray-500">Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-6">User Profile</h1>

            {/* Personal Information Section */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Personal Information</h2>
                <div className="p-4 border rounded-lg bg-gray-50">
                    <p className="text-lg"><strong>Name:</strong> {userData.firstName} {userData.lastName || "N/A"}</p>
                    <p className="text-lg"><strong>Email:</strong> {userData.email}</p>
                    <p className="text-lg"><strong>Phone:</strong> {userData.phone}</p>
                </div>
            </div>

            {/* Account Type Section */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Account Type</h2>
                <div className="p-4 border rounded-lg bg-gray-50">
                    <p className="text-lg capitalize">{userData.accountType}</p>
                </div>
            </div>

            {/* Business Cards Section */}
            {userData.businessCard && userData.businessCard.length > 0 ? (
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Business Cards</h2>
                    <div className="p-4 border rounded-lg bg-gray-50">
                        {userData.businessCard.map((card) => (
                            <div key={card._id} className="mb-2 p-2 border-b last:border-b-0">
                                <p className="text-lg">{card.name} - {card.description}</p> {/* Adjust according to your card model */}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Business Cards</h2>
                    <div className="p-4 border rounded-lg bg-gray-50">
                        <p className="text-lg">No business cards associated.</p>
                    </div>
                </div>
            )}

            {/* Additional Information (createdAt, updatedAt) */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Account Details</h2>
                <div className="p-4 border rounded-lg bg-gray-50">
                    <p className="text-lg"><strong>Created At:</strong> {new Date(userData.createdAt).toLocaleDateString()}</p>
                    <p className="text-lg"><strong>Updated At:</strong> {new Date(userData.updatedAt).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
