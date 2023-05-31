import Carousel from "../../carousel/Carousel";

const DetailsCarousel = ({ videos, mediaType, loading, heading }) => (
  <Carousel
    data={videos}
    loading={loading}
    endpoint={mediaType}
    heading={heading}
  />
);

export default DetailsCarousel;
