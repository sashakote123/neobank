import './styles.css'
import map from './../../sources/images/Huge Global.svg'

const Map = () => {
    return (
        <section className='map'>
            <h2 className="map__title">You can use our services anywhere in the world</h2>
            <h3 className="map__subtitle">Withdraw and transfer money online through our application</h3>
            <img src={map} alt="map" />
        </section>
    );
}
export default Map;