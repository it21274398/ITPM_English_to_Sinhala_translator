import React from "react";
import { Outlet, Link } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { personOutline, logOutOutline } from "ionicons/icons";
import logo from "../Images/translaterlogo.jpg";
import "../styles/Header.css";

export default function Layout() {
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

            <Link to="/translator" className="Links">
              <span className="span">Translator</span>
            </Link>

            <Link to="/contactUs" className="Links">
              <span className="span">Contact Us</span>
            </Link>

            <Link to="/aboutus" className="Links">
              <span className="span">About Us</span>
            </Link>

            <Link to="/profile" className="Links1">
              <IonIcon icon={personOutline} className="headericons" />
              <span className="profile-span">My Profile</span>
            </Link>

            <Link to="/" className="Links2">
              <IonIcon icon={logOutOutline} className="headericons" />
              <span className="logout-span">Logout</span>
            </Link>
          </nav>
        </div>
      </header>

      <div className="">
        <Outlet />
      </div>
    </div>
  );
}
