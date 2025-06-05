import CardBanner from '../cardBanner/CardBanner';
import Map from '../map/Map';
import News from '../news/News';
import Support from '../support/Support';
import './styles.css';




const MainPage = () => {
    return (
        <section className='container'>
            <CardBanner />
            <Map />
            <Support />
            <News />
        </section>
    );
}
export default MainPage;