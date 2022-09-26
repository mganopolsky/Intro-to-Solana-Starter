//IMPORTS
import React, { useEffect, useState } from "react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Program, Provider, web3 } from "@project-serum/anchor";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";

//CONSTANTS

const TEST_GIFS = [
  "https://media.giphy.com/media/35LCBkf6buF9AuzOL7/giphy.gif",
  "https://media.giphy.com/media/pxuSx9i61E40xaAFyF/giphy.gif",
  "https://media.giphy.com/media/26gspNQegsL4F1Sqk/giphy.gif",
];

const App = () => {
  //useSTATE
  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [gifList, setGifList] = useState([]);

  //TOASTS

  const showPhantomToast = () =>
    toast("To sign in, download a Phantom Wallet 👻 at https://phantom.app");
  const showConnectedWalletToast = () => toast.success("You're signed in!");
  const showDisconnectedWalletToast = () => toast.success("You've signed out!");
  const showGifSentToast = () => toast.success("GIF Sent!");

  //ACTIONS

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom wallet found!");

          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            "Connected with Public Key:",
            response.publicKey.toString()
          );
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        showPhantomToast();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log("Connected with Public Key:", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
      showConnectedWalletToast();
    }
  };

  const disconnectWallet = () => {
    console.log("Wallet Disconnected");
    setWalletAddress(null);
    showDisconnectedWalletToast();
  };

  const onInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const sendGif = async () => {
    if (inputValue.length > 0) {
      console.log("Gif link:", inputValue);
      setGifList([...gifList, inputValue]);
      setInputValue("");
      showGifSentToast();
    } else {
      console.log("Empty input. Try again.");
    }
  };

  const renderNotConnectedContainer = () => (
    <div className="container">
      <button
        className="cta-button connect-wallet-button"
        onClick={connectWallet}
      >
        SIGN IN
      </button>
      <p className="header">Scene Portal</p>
      <p className="sub-header">Your favorite scenes, on the blockchain</p>
      <div className="moon" />
      <div className="kiki" />
    </div>
  );

  const renderConnectedContainer = () => (
    <div className="connected-container">
      <p className="connected-header">SCENE PORTAL</p>
      <button
        className="cta-button disconnect-wallet-button"
        onClick={disconnectWallet}
      >
        SIGN OUT
      </button>
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          sendGif();
        }}
      >
        <input
          type="text"
          placeholder="post your favorite film/tv scene"
          value={inputValue}
          onChange={onInputChange}
        />
        <button type="submit" className="cta-button submit-gif-button">
          Submit
        </button>
      </form>
      <div className="gif-grid">
        {gifList.map((gif) => (
          <div className="gif-item" key={gif}>
            <img className="gif-image" src={gif} alt={gif} />
          </div>
        ))}
      </div>
    </div>
  );

  //useEFFECTS

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
    if (walletAddress) {
      console.log("Fetching GIF list...");

      // Call Solana program here.

      setGifList(TEST_GIFS);
    }
  }, [walletAddress]);

  return (
    <div className="App">
      <div className={walletAddress ? "authed-container" : "container"}>
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
        <div className="header-container">
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && renderConnectedContainer()}
        </div>
      </div>
    </div>
  );
};

export default App;
