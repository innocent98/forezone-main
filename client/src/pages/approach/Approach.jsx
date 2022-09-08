import "./approach.css";

const Approach = () => {
  return (
    <div className="approach">
      <div className="ourApproach">
        <div className="specialize">
          <h5>Our Approach</h5>
          <h2>
            We specilize in investing with technology startups in the bay area
          </h2>
          <p>
            We expect future benefits as an investment in the form of a positive
            return. The return may consist of capital gain and/or investment
            income, including dividends, interest, rental income etc.
          </p>
        </div>

        <div className="specializeAreas">
          <div className="specializeAreasEach">
            <div className="specializePic">
              <img
                src="https://149351892.v2.pressablecdn.com/wp-content/uploads/2016/03/image-1.jpg"
                alt=""
              />
            </div>
            <div className="specializeTxt">
              <p>Our Approach</p>
              <h4>Investing in new energy markets</h4>
            </div>
          </div>
          <div className="specializeAreasEach">
            <div className="specializePic">
              <img
                src="https://149351892.v2.pressablecdn.com/wp-content/uploads/2016/03/image-2.jpg"
                alt=""
              />
            </div>
            <div className="specializeTxt">
              <p>Our Philosophy</p>
              <h4>Securing the technology sector</h4>
            </div>
          </div>
          <div className="specializeAreasEach">
            <div className="specializePic">
              <img
                src="https://149351892.v2.pressablecdn.com/wp-content/uploads/2016/03/image3.jpg"
                alt=""
              />
            </div>
            <div className="specializeTxt">
              <p>Our Services</p>
              <h4>Rethinking education</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="startup">
        <div className="startupBkImg">
          <img
            src="https://149351892.v2.pressablecdn.com/wp-content/uploads/2016/03/investmen-tquote.jpg?id=21"
            alt=""
          />
          <div className="roleImg">
            <img src="assets/Potter.jpeg" alt="" />
          </div>
          <div className="role">
            <p>
              "Role building, implementation and collaboration influence the
              group, while philosophies dramatically result in a calibration."
            </p>
            <h6>John Desmond - CEO</h6>
            {/* <h2>Startup</h2> */}
          </div>
        </div>
      </div>

      <div className="portfolio">
        <div className="portfolioTxt">
          <h6>Portfolio</h6>
          <h2>Investment Portfolio</h2>
        </div>
        <div className="portfolioPic">
          <div className="img">
            <img
              src="https://bitcoin.org/img/icons/opengraph.png?1648897668"
              alt=""
            />
          </div>
          <div className="img">
            <img
              src="https://logowik.com/content/uploads/images/ethereum3649.jpg"
              alt=""
            />
          </div>
          <div className="img">
            {" "}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Ripple_logo.svg/1280px-Ripple_logo.svg.png"
              alt=""
            />
          </div>
          <div className="img">
            <img
              src="https://ih1.redbubble.net/image.564974415.1554/st,small,507x507-pad,600x600,f8f8f8.u1.jpg"
              alt=""
            />
          </div>
          <div className="img">
            <img
              src="https://seeklogo.com/images/S/shiba-inu-shib-logo-9542F950B0-seeklogo.com.png"
              alt=""
            />
          </div>
          <div className="img">
            <img
              src="https://s2.coinmarketcap.com/static/img/coins/200x200/1958.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Approach;
