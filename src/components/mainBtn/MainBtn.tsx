import './styles.css'

interface Props {
    title: string
}

const MainBtn: React.FC<Props> = ({ title }) => {
    return (
        <button className='button'>
            {title}
        </button>
    );
}
export default MainBtn;