import React from "react";
import ReactDOM from "react-dom";
import Slider from "react-slick";

//styles
import "../index.css";

function App() {
  return (
    <div className="App">
      <h2>React Slick without CSS Modules</h2>
      <div>
        <Slider {...settingsNoModules}>
          <div>
            <p>Lorem Ipsum 1</p>
          </div>
          <div>
            <p>Lorem Ipsum 2</p>
          </div>
          <div>
            <p>Lorem Ipsum 3</p>
          </div>
        </Slider>
      </div>
      <div
        style={{ backgroundColor: "black", height: "2px", margin: "20px 0" }}
      />
    </div>
  );
}

const settingsNoModules = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  dotsClass: "button__bar",
  arrows: false,
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
