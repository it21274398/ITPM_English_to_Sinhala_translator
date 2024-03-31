import React from "react";
import "../styles/AboutUScreen.css";
import Image from "../Images/dictionary.jpg";

export default function AboutUs() {
  return (
    <div class="container" id="aboutuscontainer">
      <div class="">
        <h1 className="aboutus-title">About Us</h1>
        <div class="image-div">
          <center>
            <img src={Image} alt="" className="aboutus-image" />
          </center>
        </div>

        <div class="discription-div">
          <p class="aboutu-spar">
            We are a dedicated team of SLIIT university students, passionate
            about language and technology. Our mission is to bridge the language
            gap and facilitate effective communication across cultures. Our team
            members,
            <b>Dissanayake A.L.</b>,<b>Jayesinghe A.L.L</b>,
            <b>Mindinu G.P.D.A</b> and <b>Sepala S.N</b> have come together to
            create a versatile and user-friendly translator web application that
            offers more than just basic translations.
          </p>
        </div>
      </div>
    </div>
  );
}
