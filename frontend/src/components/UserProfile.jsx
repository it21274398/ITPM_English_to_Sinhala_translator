import React, { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = () => {
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    // Fetch user profile data when component mounts
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("/api/user/profile"); // Assuming your backend route is '/api/user/profile'
      setProfileData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateProfile = async (updatedProfileData) => {
    try {
      const response = await axios.put("/api/user/profile", updatedProfileData); // Assuming your backend route for updating profile is '/api/user/profile'
      setProfileData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="profile-container">
      <h1 className="title">User Profile</h1>
      <div className="inputnames">
        <p className="userinputs">First Name: </p>
        <input
          type="text"
          id="fname"
          name="firstName"
          value={profileData.firstName || ''}
          onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
          required
          className="userprofileinputs"
        />
        <p className="userinputs">Last Name: </p>
        <input
          type="text"
          id="lname"
          name="lastName"
          value={profileData.lastName || ''}
          onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
          required
          className="userprofileinputs"
        />
      </div>

      <div className="conemail">
        <p className="userinputs">Contact No: </p>
        <input
          type="tel"
          id="contactno"
          name="phoneNumber"
          value={profileData.contact || ''}
          onChange={(e) => setProfileData({...profileData, contact: e.target.value})}
          required
          className="userprofileinputs"
        />
        {/* Add other profile fields */}
      </div>

      <button onClick={() => handleUpdateProfile(profileData)}>Update Profile</button>
    </div>
  );
};

export default UserProfile;