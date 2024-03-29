import "../styles/UserProfile.css";


const UserProfile = () => {
  return (
    <div className="profile-container">
      <h1 className="title">User Profile</h1>
      <div className="inputnames">
        <p className="userinputs">First Name: </p>
        <input
          //placeholder="First name"
          type="text"
          id="fname"
          name="firstName"
          required
          className="userprofileinputs"
        />
        <p className="userinputs">Last Name: </p>
        <input
          //placeholder="Last name"
          type="text"
          id="lname"
          name="lastName"
          required
          className="userprofileinputs"
        />
      </div>

      <div className="conemail">
        <p className="userinputs">Contact No: </p>
        <input
          //placeholder="Tel No"
          type="tel"
          id="contactno"
          name="phoneNumber"
          required
          className="userprofileinputs"
        />
        <p className="userinputs">Email: </p>
        <input
          //placeholder="Email"
          type="email"
          id="email"
          name="email"
          required
          className="userprofileinputs"
        />
      </div>
    </div>
  );
};

export default UserProfile;
