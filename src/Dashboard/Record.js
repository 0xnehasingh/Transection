import Bank from '../abi.json';
import './Record.css';
import React, { useEffect, useState } from 'react';

const contractAddress = "0xed8a14769ea2bf7de886f490874a537df1408ea4";



const Record = () => {
  // State
  const [currentAccount, setCurrentAccount] = useState(null);
  
  const [depositmoney, setDepositmoney] = useState(0);

  // Actions
  const DepositToken = async () => {

    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, Bank, signer);
        const DepositToken = await contract.Deposit(depositmoney);
      }
      
    } catch (error) {
      console.log(error);
    }

}
const WithdrawToken = async () => {

}
const balenceToken = async () => {

}
const totalbalenceToken = async () => {

}
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log('Make sure you have MetaMask!');
        return;
      } else {
        console.log('We have the ethereum object', ethereum);

        const accounts = await ethereum.request({ method: 'eth_accounts' });

        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log('Found an authorized account:', account);
          setCurrentAccount(account);
        } else {
          console.log('No authorized account found');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*
   * Implement your connectWallet method here
   */
  const connectWalletAction = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }

      /*
       * Fancy method to request access to account.
       */
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      /*
       * Boom! This should print out public address once we authorize Metamask.
       */
      console.log('Connected', accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);


  return (
    <div className="Record">
      <header className="Record-header">
      <div id="account-area">
  <div className="container">
    <div className="row">
      <div><h1>Transaction Record</h1></div>
      <button
              className="cta-button connect-wallet-button"
              onClick={connectWalletAction}
            >
              Connect Wallet To Get Started
            </button>
            
      <div className="col-lg-4 mb-3">
        <div className="deposit status">
          <h5>Deposit</h5>
          <h2>
            $ <span id="current-deposit">00</span>
          </h2>
        </div>
      </div>
      <div className="col-lg-4 mb-3">
        <div className="withdraw status">
          <h5>Withdraw</h5>
          <h2>
            $ <span id="current-withdraw">00</span>
          </h2>
        </div>
      </div>
      <div className="col-lg-4 mb-3">
        <div className="balance status">
          <h5>Balance</h5>
          <h2>
            $ <span id="current-balance">00</span>
          </h2>
        </div>
      </div>
      <div className="col-lg-4 mb-3">
        <div className="totalbalance status">
          <h5>TotalBalance</h5>
          <h2>
            $ <span id="total-balance">000</span>
          </h2>
        </div>
      </div>
    </div>
  </div>
  <div className="container">
    <div className="row">
      <div className="col-lg-6">
        <div className="submit-area">
          <h4>Deposit Amount</h4>
          <input
            id="deposit-amount"
            type="text"
            className="form-control"
            placeholder="Enter deposit amount"
          />
          <br />
          <button id="deposit-btn" className="btn btn-success">
            Deposit
          </button>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="submit-area">
          <h4>Withdraw Amount</h4>
          <input
            id="withdraw-amount"
            type="text"
            className="form-control"
            placeholder="Enter withdraw amount"
          />
          <br />
          <button id="withdraw-btn" className="btn btn-success">
            Withdraw
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

      </header>
    </div>
  );
};

export default Record;
