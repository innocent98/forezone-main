import { useContext, useEffect, useState } from "react";
import "./deposit.scss";
import { axiosInstance } from "../../config";
import { Context } from "../../context/Context";

const Deposit = ({ deposit, setDeposit }) => {
  const { accessToken, user } = useContext(Context);

  const [copy, setCopy] = useState(false);
  const [loading, setLoading] = useState(false);

  //fetch wallet
  const [wallet, setWallet] = useState([]);

  useEffect(() => {
    const fetchWallet = async () => {
      const res = await axiosInstance.get("/user/wallet");
      setWallet(res.data);
    };
    fetchWallet();
  }, [setWallet]);

  // sent
  const [amount, setAmount] = useState(0);
  const handleSent = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/user/sent", {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
        },
        accessToken: user.accessToken,
        amount,
      });
      setLoading(false);
      window.location.reload();
      return alert(res.data);
    } catch (error) {
      setLoading(false);
      return alert(error.response.data);
    }
  };

  return (
    <div className="depositWallet">
      <h3>
        Deposit USDT into the wallet address below. <br /> NB: Use trc20 as your
        network
      </h3>
      {wallet.map((w) => (
        <div key={w._id}>
          <input
            type="text"
            name="address"
            className="form-control shadow-none"
            id=""
            value={w.wallet}
            readOnly
          />
          <span className="material-icons" onClick={() => setDeposit(!deposit)}>
            close
          </span>
          <button
            onClick={() =>
              navigator.clipboard.writeText(w.wallet) && setCopy(true)
            }
          >
            {copy ? "Copied" : "Copy"}
          </button>
        </div>
      ))}
      <form className="row" onSubmit={handleSent}>
        <div className="col-md-3">
          <select
            className="form-control shadow-none"
            name="amount"
            id=""
            required
            onChange={(e) => setAmount(e.target.value)}
          >
            <option value="">Select amount</option>
            <option value="10">$10</option>
            <option value="20">$20</option>
            <option value="50">$50</option>
            <option value="100">$100</option>
            <option value="150">$150</option>
            <option value="200">$200</option>
            <option value="250">$250</option>
            <option value="500">$500</option>
            <option value="1000">$1000</option>
          </select>
          {/* <input
            type="number"
            name="amount"
            className="form-control shadow-none"
            placeholder="Enter USDT amount deposited"
            required
            min={10}
            onChange={(e) => setAmount(e.target.value)}
          /> */}
        </div>
        <div className="col-md-3">
          <button type="submit">
            {" "}
            {loading ? "Please wait..." : "I have sent it"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Deposit;
