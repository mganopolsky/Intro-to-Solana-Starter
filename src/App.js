//IMPORTS
import React, { useEffect, useState } from "react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Program, Provider, web3 } from "@project-serum/anchor";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";

//CONSTANTS

const App = () => {
  //useSTATE

  //TOASTS

  //ACTIONS
  const renderNotConnectedContainer = () => (
    <div className="container">
      <p className="header">Scene Portal</p>
      <p className="sub-header">Your favorite scenes, on the blockchain</p>
      <div className="moon" />
      <div className="kiki" />
    </div>
  );

  //useEFFECTS

  return (
    <div className="App">
      <div className="container">
        <Toaster
          toastOptions={{
            className: "",
            duration: 3000,
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#713200",
            },
          }}
        />
        <div className="header-container">{renderNotConnectedContainer()}</div>
      </div>
    </div>
  );
};

export default App;
