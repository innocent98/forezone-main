import "./team.css";
import andy from "./assets/andy.jpeg";
import george from "./assets/george.jpeg";
import holley from "./assets/holley.jpeg";

const Team = () => {
  return (
    <div className="team" id="team">
      <div className="teamTxt">
        <p>The Team</p>
        <h2>Meet the Team</h2>
      </div>
      <div className="teamPic">
        <div className="img">
          <img src={andy} alt="" />
          <h3>Howlley Peter</h3>
        </div>
        <div className="img">
          <img src={george} alt="" />
          <h3>George Astro</h3>
        </div>
        <div className="img">
          <img src={holley} alt="" />
          <h3>Andy Anderson’s</h3>
        </div>
      </div>
    </div>
  );
};

export default Team;
