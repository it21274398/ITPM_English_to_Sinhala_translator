import React from "react";
import { Outlet, Link } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { personOutline, logOutOutline } from "ionicons/icons";
import logo from "../Images/logo1.png";
import "../styles/Header.css";
//----------------------------------------------------------
export default function Layout() {

  const  handleLogout=()=>{
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      window.location = "/"
  }
  return (
    <div className="header">
      <header>
        <div className="header-container">
          <nav>
            <Link to="/home" className="Links">
              <img className="logo" src={logo} alt="" />
            </Link>
            <Link to="/home" className="Links">
              <span className="span">Home</span>
            </Link>
            <Link to="/History" className="Links">
              <span className="span"> History</span>
            </Link>
            <Link to="/Voicetotext" className="Links">
              <span className="span">Voice To Text</span>
            </Link>
            <Link to="/grammercheck" className="Links">
              <span className="span">Grammer Checker</span>
            </Link>{" "}
            <Link to="/aboutus" className="Links">
              <span className="span">About Us</span>
            </Link>
            <Link to="/user" className="Links1">
              <IonIcon icon={personOutline} className="headericons" />
              <span className="profile-span">My Profile</span>
            </Link>
            <button onClick={handleLogout} className="Links2">
              <IonIcon icon={logOutOutline}  className="headericons" />
              <span className="logout-span">Logout</span>
            </button>{" "}
          </nav>
        </div>
      </header>

      <div className="">
        <Outlet />
      </div>
    </div>
  );
}
