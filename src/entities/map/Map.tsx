import "./styles.css";
import map from "./assets/HugeGlobal.svg";

const Map = () => {
  return (
    <section className="map">
      <h2 data-testid="title" className="map__title">
        You can use our services anywhere in the world
      </h2>
      <h3 data-testid="subtitle" className="map__subtitle">
        Withdraw and transfer money online through our application
      </h3>
      <img data-testid="mapimage" src={map} alt="map" />
    </section>
  );
};
export default Map;
