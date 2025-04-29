import { useState, useEffect } from "react";

import { useAuth } from "../hooks/use-auth";
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { gapi } from 'gapi-script'
export default function AuthFeature() {
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const { login, register, authUser } = useAuth();

  if (authUser.role == "ADMIN") {
    window.location.href = "adminWorkPage"
  }
  if (authUser.role == "PREPRESS") {
    window.location.href = "prepressWorkPage"
  }
  if (authUser.role == "SALES") {
    window.location.href = "salesWorkPage"
  }
  if (authUser.role === "ADMIN" && authUser.email === "scanner") {
    window.location.href = "scannerPage"
  }
  if (authUser.role === "PRODUCTIONPLANNER" ) {
    window.location.href = "productionPlanningWorkPage"
  }
  const handleLoginButton = () => {
    event.preventDefault();
    login(loginInput);
  };
  const handleLoginInput = (e) => {
    setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
  };

  const handleRegisterButton = () => {
    register(loginInput);
  };


  ////////
  const clientId = "225578328910-orvfbaovsd0t4m0gnfji16hdddc6tkj1.apps.googleusercontent.com"

  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      })
    }
    gapi.load("client:auth2", initClient)
  }, [])

  const onSuccess = (res) => {
    setProfile(res.profileObj)
    console.log('Login Success:', res.profileObj)
  }

  const onFailure = (res) => {
    console.log('Login Failed:', res)
  }

  const logOut = () => {
    setProfile(null)
  }
  return (
    <form className="h-screen w-screen flex items-center justify-center" onSubmit={handleLoginButton}>
    <div className="">
      <img className="pb-5" src={"src/assets/logo.svg"} alt="" />
      <div className="flex items-center justify-center">
        <div className="">
          <div className="text-2xl pb-2">E-mail</div>
          <input
            name="email"
            onChange={handleLoginInput}
            className="bg-gray-100 rounded-sm w-[300px] p-2 border-2 border-black"
            type="text"
          />
          <div className="text-2xl pb-2">Password</div>
          <input
            name="password"
            onChange={handleLoginInput}
            className="bg-gray-100 rounded-sm w-[300px] p-2 border-2 border-black"
            type="password"
          />
          {/* Commented code */}
          {/* <div>
            {profile ? (
              <div>
                <img src={profile.imageUrl} alt="User Profile" />
                <h3>User Logged in</h3>
                <p>Name: {profile.name}</p>
                <p>Email: {profile.email}</p>
                <br />
                <br />
                <GoogleLogout clientId={clientId} buttonText='Log out' onLogoutSuccess={logOut} />
              </div>
            ) : (
              <GoogleLogin
                clientId={clientId}
                buttonText='Sign in with Google'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
              />
            )}
          </div> */}
          <div className="flex gap-2 pt-5 items-center justify-center">
            <button
            onClick={handleLoginButton}
              type="submit"
              className="bg-gray-700 text-white p-1 rounded-md pr-5 pl-5"
            >
              Login
            </button>
            <button
            onClick={()=> window.location = '/queueDashBroad'}
              type="submit"
              className="bg-gray-700 text-white p-1 rounded-md pr-5 pl-5"
            >
             Go to the Summary Page.
            </button>
            {/* <button
              onClick={handleRegisterButton}
              className="bg-gray-700 text-white p-1 rounded-md pr-5 pl-5"
            >
              Register
            </button> */}
          </div>
        </div>
      </div>
    </div>
  </form>
  
  );
}
