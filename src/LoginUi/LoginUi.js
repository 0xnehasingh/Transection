
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './LoginUi.css';
import profile from "./../image/a.png";
import Dashboard from  '../Dashboard/Record';

function LoginUi() {
  const [currentAccount, setCurrentAccount] = useState('');

  const Connect = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const accounts = await provider.send("eth_requestAccounts", []);
    setCurrentAccount(accounts);

  }
  const renderConnectedContainer = () => (
    <><Dashboard/></>

  );
  const renderNotConnectedContainer = () => (
    <div className="main">
     <div className="sub-main">
       <div>
         <div className="imgs">
           <div className="container-image">
             <img src={profile} alt="profile" className="profile"/>

           </div>


         </div>
         <div>
           <h1>Login Page</h1>
          <div className="login-button">
          <button onClick={Connect}>Login</button>
          </div>
           
         </div>
       </div>
       

     </div>
    </div>


  );

  return (
    <>{!currentAccount && renderNotConnectedContainer()}
    {currentAccount && renderConnectedContainer()}
    </>

    
  );
}

export default LoginUi;