import "./styles.css";
import CardBanner from "@/src/entities/cardBanner/CardBanner";
import Currency from "@/src/entities/currency/Currency";
import Map from "@/src/entities/map/Map";
import News from "@/src/widgets/news/News";
import Support from "@/src/widgets/support/Support";

const MainPage = () => {
  return (
    <section data-testid="mainPage" className="container">
      <CardBanner />
      <Currency />
      <Map />
      <Support />
      <News />
    </section>
  );
};
export default MainPage;
