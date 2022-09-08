import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./admin.scss";
import { decode } from "jsonwebtoken";
import { axiosInstance } from "../../config";

const Admin = () => {
  const { user, dispatch } = useContext(Context);
  const accessToken = useContext(Context);
  // const refreshToken = useContext(Context);

  //logout function
  const handleLogout = async () => {
    dispatch({ type: "LOGOUT" });
  };

  //logout a user automatically when session expired
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

  //fetch all users
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axiosInstance.get("/user");
      setUsers(res.data);
    };
    fetchUsers();
  }, [setUsers]);

  //edit and update wallet
  const [wallet, setWallet] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    try {
      const res = await axiosInstance.post("/user/wallet-post", {
        wallet,
      });
      setSuccess(true);
      alert("Wallet uploaded!");
      if (success === true) {
        res.data && window.location.reload();
      }
    } catch (err) {
      setError(true);
      error && alert("Internal error occured!");
    }
  };

  return (
    <div className="admin">
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-4">
          <input
            type="text"
            placeholder="Enter new BTC address"
            className="form-control"
            onChange={(e) => setWallet(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <button className="btn btn-primary" type="submit">
            Upload
          </button>
        </div>
      </form>

      <button className="logout" onClick={handleLogout}>
        {user ? "Logout" : "Login"}
      </button>

      <div className="adminContainer">
        <table className="table table-borderless">
          <thead>
            <tr>
              <th scope="col" className="text-center">
                Username
              </th>
              <th scope="col" className="text-center">
                Account Balance
              </th>
              <th scope="col" className="text-center">
                Invested Amount
              </th>
              <th scope="col" className="text-center">
                Total Profit
              </th>
              <th scope="col" className="text-center">
                Total Withdrawal
              </th>
              <th scope="col" className="text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td className="text-center">{u.isAdmin ? "" : u.username}</td>
                <td className="text-center">
                  {u.isAdmin ? "" : u.accountBalance}
                </td>
                <td className="text-center">
                  {u.isAdmin ? "" : u.investedAmount}
                </td>
                <td className="text-center">
                  {u.isAdmin ? "" : u.dailyProfit}
                </td>
                <td className="text-center">
                  {u.isAdmin ? "" : u.totalWithdrawal}
                </td>
                <td className="text-center button">
                  <Link to={`/edit-user/${u._id}`}>
                    {" "}
                    <button className={u.isAdmin ? "none" : "edit btn-primary"}>
                      {u.isAdmin ? "" : "Edit"}
                    </button>
                  </Link>
                  <Link to={`/user/delete/${u._id}`}>
                    <button
                      className={u.isAdmin ? "none" : "delete btn-danger"}
                    >
                      {u.isAdmin ? "" : "Delete"}
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
