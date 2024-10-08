import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos } from "../store/photoSlice";
import Slider from "react-slick";

// Carousel component
const PhotoCarousel = () => {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.photos.photos);
  const photoStatus = useSelector((state) => state.photos.status);

  useEffect(() => {
    if (photoStatus === "idle") {
      dispatch(fetchPhotos());
    }
  }, [photoStatus, dispatch]);

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div>
      {photoStatus === "loading" && <p>Loading...</p>}
      {photoStatus === "failed" && <p>Error loading photos.</p>}
      {photoStatus === "succeeded" && (
        <Slider {...settings}>
          {photos.map((photo) => (
            <div key={photo.id}>
              <img src={photo.urls.small} alt={photo.alt_description} />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default PhotoCarousel;
