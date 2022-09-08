/* eslint-disable jsx-a11y/no-distracting-elements */
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import "./dashboard.css";
import { decode } from "jsonwebtoken";
import Deposit from "../deposit/Deposit";
import Withdraw from "../withdraw/Withdraw";
import { axiosInstance } from "../../config";
import { getRemainingTimeUntilMsTimestamp } from "../utils/utils";

const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};

const Dashboard = () => {
  const { user, dispatch, accessToken } = useContext(Context);
  const [lU, setLU] = useState({});

  const handleLogout = async () => {
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    const findUser = async () => {
      const res = await axiosInstance.post("/user/user-single", {
        userId: user.user._id,
      });
      setLU(res.data);
    };
    findUser();
  }, [user.user._id]);

  const percentage = async (e) => {
    try {
      await axiosInstance.put("/user/percent/update", {
        userId: user.user._id,
      });
      window.location.reload();
    } catch (error) {}
  };

  const countdownTimestampMs = lU.time;

  const currentTime = new Date();
  const totalSeconds = (currentTime - countdownTimestampMs) / 1000;
  // console.log(totalSeconds);

  // FIXME: automate percent
  useEffect(() => {
    if (lU.time != null) {
      const handleMining = async (e) => {
        if (totalSeconds >= 0) {
          await percentage();
        }
      };
      handleMining();
    }
  });

  //TODO: get countdown to unlocking
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime(countdownTimestampMs);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [countdownTimestampMs]);

  function updateRemainingTime(countdown) {
    setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
  }

  //logout a user automatically when session expired
  useEffect(() => {
    const token = user.accessToken;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
        return alert("Session expired! kindly login again to continue");
      }
    }
  });

  //handle deposit and withdrawal
  const [deposit, setDeposit] = useState(false);
  const [withdraw, setWithdraw] = useState(false);

  return (
    <div className="dashboard">
      <div className="top">
        <div className="left">
          <h3> Welcome back {user.user.username}</h3>
          <marquee behavior="" direction="left">
            You get lifetime 5% increment of your investment every 24 hours... Add 1
            USDT to every of your deposit as network fee... Invite a user and
            earn 5% of thier first deposit... You can always upgrade your
            investment plan to earn more and overcome withraw limit... Always ensure you login daily to view profit...
          </marquee>
        </div>
        {/* <div className="right">
          invite a user and earn 5% of thier first deposit
        </div> */}
      </div>
      <div className="body">
        <div className="left">
          <ul>
            <li className="li">
              <div className="icon">
                <i className="bi bi-person-circle"></i>
              </div>
              <h5>Account</h5>
            </li>
            <li className="li">
              <div className="icon">
                <i className="bi bi-cash-stack"></i>
              </div>
              <h5 onClick={() => setDeposit(!deposit)}>Deposit</h5>
            </li>
            <li className="li">
              <div className="icon">
                <i className="bi bi-collection"></i>
              </div>
              <h5 onClick={() => setWithdraw(!withdraw)}>Withdraw</h5>
            </li>
            {/* <li className="li">
              <h5>
                {`${remainingTime.hours}h : ${remainingTime.minutes}m : ${remainingTime.seconds}s`}
              </h5>
            </li> */}
            <li className="li">
              <div className="icon">
                <i className="bi bi-box-arrow-left"></i>
              </div>
              <h5 onClick={handleLogout}>{user && "Logout"}</h5>
            </li>
          </ul>
        </div>

        <div className="right">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col">
                {/* <FontAwesomeIcon icon="fa-solid fa-wallet" /> */}
                <p>TOTAL WITHDRAWN</p>
                {/* <FontAwesomeIcon icon="fa-solid fa-signal" /> */}
                <h4>${lU.totalWithdrawal}</h4>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-md-4 col">
                <p>TOTAL PROFIT</p>
                <h4>${lU.dailyProfit}</h4>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-md-4 col">
                <p>ACCOUNT BALANCE</p>
                <h4>${lU.accountBalance}</h4>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-md-4 col">
                <p>INVESTED AMOUNT</p>
                <h4>${lU.investedAmount}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={deposit ? "deposit" : "none"}>
        <Deposit deposit={deposit} setDeposit={setDeposit} />
      </div>
      <div className={withdraw ? "withdraw" : "none"}>
        <Withdraw withdraw={withdraw} setWithdraw={setWithdraw} />
      </div>
    </div>
  );
};

export default Dashboard;
