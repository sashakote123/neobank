import OptionsListItem from '@/src/entities/optionsListItem/OptionsListItem';
import LinkBtn from '@/src/shared/linkBtn/LinkBtn';

import bankCardImage1 from './assets/cardImage1.png';
import bankCardImage2 from './assets/cardImage2.png';
import bankCardImage3 from './assets/cardImage3.png';
import bankCardImage4 from './assets/cardImage4.png';
import illustration from './assets/Illustration.svg';
import './styles.css';

const optionsArray: string[] = [
  'Powerfull online protection.',
  'Cashback without borders.',
  'Personal design.',
  'Work anywhere in the world.',
];
const imagesArray: string[] = [bankCardImage1, bankCardImage2, bankCardImage3, bankCardImage4];

const CardBanner = () => {
  return (
    <section>
      <div className="banner">
        <h1 data-testid="header" className="banner__title">
          Choose the design you like and apply for card right now
        </h1>
        <div data-testid="link" className="main-btn">
          <LinkBtn title="Choose the card" link="/card" />
        </div>

        <div className="banner__grid">
          {imagesArray.map((item: string, index: number) => {
            return <img key={index} className="grid__image" src={item} alt="img" />;
          })}
        </div>
      </div>

      <div className="options">
        <img className="options__image" src={illustration} alt="illustration" />
        <h2 data-testid="header2" className="options__subtitle">
          We Provide Many Features You Can Use
        </h2>
        <h3 data-testid="header3" className="options__desc">
          You can explore the features that we provide with fun and have their own functions each
          feature
        </h3>
        <ul className="options__list">
          {optionsArray.map((item: string) => (
            <OptionsListItem key={item} text={item} />
          ))}
        </ul>
      </div>
    </section>
  );
};
export default CardBanner;
