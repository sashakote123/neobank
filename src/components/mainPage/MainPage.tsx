import './styles.css';
import CardBanner from '../cardBanner/CardBanner';
import Currency from '../currency/Currency';
import Map from '../map/Map';
import News from '../news/News';
import Support from '../support/Support';

const MainPage = () => {
    return (
        <section className="container">
            <CardBanner />
            <Currency />
            <Map />
            <Support />
            <News />
        </section>
    );
};
export default MainPage;
