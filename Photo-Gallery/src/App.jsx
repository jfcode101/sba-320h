import React from "react";
import { Provider } from "react-redux";
import PhotoCarousel from "./assets/components/Carousel";
import store from "./assets/store/store";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <Provider store={store}>
      <div className="cls-wrapper">
        <h1>Photo Application</h1>
        <PhotoCarousel />
      </div>
    </Provider>
  );
}

export default App;
