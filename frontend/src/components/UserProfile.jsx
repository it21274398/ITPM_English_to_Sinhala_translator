import React, { useState, useEffect } from "react";
import axios from "axios";
import { PDFDownloadLink, Document, Page, Text } from "@react-pdf/renderer";
import "../styles/UserProfile.css"; // Import external CSS file

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

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

  const handleUpdateProfile = () => {
    setIsEditing(true);
    setEditedUser({
      firstName: user.firstName,
      lastName: user.lastName,
      contact: user.contact,
    });
  };

  const handleSaveProfile = async () => {
    try {
      await axios.put("http://localhost:8090/user/profile", editedUser);
      setIsEditing(false);
      fetchUserProfile();
    } catch (error) {
      console.error(error);
      setError("Failed to update user profile");
    }
  };

  const handleDeleteProfile = async () => {
    try {
      await axios.delete("http://localhost:8090/user/profile");
      // Optionally, you can redirect the user to a login page or another page after deletion
      // For example: window.location.href = "/login";
      setUser(null);
    } catch (error) {
      console.error(error);
      setError("Failed to delete user profile");
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
            <strong>First Name:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                value={editedUser.firstName}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, firstName: e.target.value })
                }
              />
            ) : (
              user.firstName
            )}
          </p>
          <p>
            <strong>Last Name:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                value={editedUser.lastName}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, lastName: e.target.value })
                }
              />
            ) : (
              user.lastName
            )}
          </p>
          <p>
            <strong>Contact:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                value={editedUser.contact}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, contact: e.target.value })
                }
              />
            ) : (
              user.contact
            )}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          {isEditing ? (
            <button className="save-button" onClick={handleSaveProfile}>
              Save
            </button>
          ) : (
            <>
              <button className="update-button" onClick={handleUpdateProfile}>
                Update
              </button>
              <button className="delete-button" onClick={handleDeleteProfile}>
                Delete
              </button>
            </>
          )}
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
