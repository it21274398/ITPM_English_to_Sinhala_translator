import React, { useState, useEffect } from "react";
import axios from "axios";
import { PDFDownloadLink, Document, Page, Text } from "@react-pdf/renderer";
import "../styles/UserProfile.css"; // Import external CSS file

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("http://localhost:8090/user/profile");
      setUser(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch user profile");
    }
  };

  // Define PDF document component
  const MyDocument = ({ user }) => (
    <Document>
      <Page>
        <Text>========My Details========</Text>
        <div className="section">
          <Text>First Name : {user.firstName}</Text>
        </div>
        <div className="section">
          <Text>Last Name : {user.lastName}</Text>
        </div>
        <div className="section">
          <Text>Contact : {user.contact}</Text>
        </div>
        <div className="section">
          <Text>Email : {user.email}</Text>
        </div>
      </Page>
    </Document>
  );

  return (
    <div className="profile-container">
      <h1 className="title">My Profile</h1>
      {error && <p className="error">{error}</p>}
      {user && (
        <div className="user-details">
          <p>
            <strong>First Name:</strong> {user.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {user.lastName}
          </p>
          <p>
            <strong>Contact:</strong> {user.contact}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          {/* PDF Download Link */}
          <PDFDownloadLink
            className="download-pdf"
            document={<MyDocument user={user} />}
            fileName="user_profile.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download PDF"
            }
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
};

export default UserProfile;