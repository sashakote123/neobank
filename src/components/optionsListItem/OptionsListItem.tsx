import './styles.css'
import checkImage from './../../sources/images/mainPage/check.svg'

interface Props {
    text: string
}

const OptionsListItem: React.FC<Props> = ({ text }) => {
    return (
        <li className="options__item">
            <img src={checkImage} alt="check" />
            <div className="item__text">{text}</div>
        </li>
    );
}
export default OptionsListItem;