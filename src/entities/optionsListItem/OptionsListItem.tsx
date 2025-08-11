import checkImage from '@images/mainPage/check.svg';

import './styles.css';

interface Props {
  text: string;
}

const OptionsListItem: React.FC<Props> = ({ text }) => {
  return (
    <li className="options__item">
      <img src={checkImage} alt="check" />
      <div data-testid="text" className="item__text">
        {text}
      </div>
    </li>
  );
};
export default OptionsListItem;
