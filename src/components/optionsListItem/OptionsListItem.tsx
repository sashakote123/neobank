import './styles.css'
import check from './../../sources/images/mainPage/check.svg'

interface Props {
    text: string
}

const OptionsListItem: React.FC<Props> = ({ text }) => {
    return (
        <li className="options__item">
            <img src={check} alt="check" />
            <div className="item__text">{text}</div>
        </li>
    );
}
export default OptionsListItem;