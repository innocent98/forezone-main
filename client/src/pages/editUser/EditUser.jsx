import { decode } from "jsonwebtoken";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { axiosInstance } from "../../config";
import { Context } from "../../context/Context";
import "./editUser.scss";

const EditUser = () => {
  const {dispatch} = useContext(Context);
  const accessToken = useContext(Context);

  //get single user  function
  const [singleUser, setUser] = useState([]);

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get(`/user/${path}`);
      setUser(res.data);
    };
    fetchUser();
  }, [path]);

  //edit user function
  const [accountBalance, setAccountBalance] = useState(singleUser.accountBalance);
  const [investedAmount, setInvestedAmount] = useState(singleUser.investedAmount);
  const [dailyProfit, setDailyProfit] = useState(singleUser.dailyProfit);
  const [totalWithdrawal, setTotalWithdrawal] = useState(singleUser.totalWithdrawal);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/user/edit-user/${path}`, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
        },
        accessToken: accessToken.accessToken,
        accountBalance,
        investedAmount,
        dailyProfit,
        totalWithdrawal,
      });
      setSuccess(true);
      success && window.location.replace("/admin");
    } catch (error) {}
  };

  //logout a user automatically when session expired
  const handleLogout = async () => {
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    const token = accessToken.accessToken;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
        return alert("Session expired! kindly login again to continue");
      }
    }
  });

  return (
    <div className="editUser">
      <div className="userContainer">
        <form className="row" onSubmit={handleSubmit}>
          <div className="col-md-4">
            <input
              type="text"
              value={singleUser.username}
              className="form-control"
              name="username"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="accountBalance" className="form-label">
              Account Balance
            </label>
            <input
              type="number"
              defaultValue={singleUser.accountBalance}
              className="form-control"
              name="accountBalance"
              onChange={(e) => setAccountBalance(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="investedAmount" className="form-label">
              Invested Amounnt
            </label>
            <input
              type="number"
              defaultValue={singleUser.investedAmount}
              className="form-control"
              name="investedAmount"
              onChange={(e) => setInvestedAmount(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="dailyProfit" className="form-label">
              Daily Profit
            </label>
            <input
              type="number"
              defaultValue={singleUser.dailyProfit}
              className="form-control"
              name="dailyProfit"
              onChange={(e) => setDailyProfit(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="totalWithdrawal" className="form-label">
              Total Withdrawal
            </label>
            <input
              type="number"
              defaultValue={singleUser.totalWithdrawal}
              className="form-control"
              name="totalWithdrawal"
              onChange={(e) => setTotalWithdrawal(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <button className="btn" type="submit">
              update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
