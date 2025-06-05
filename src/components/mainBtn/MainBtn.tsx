import './styles.css'

interface props {
    title: string
}

const MainBtn: React.FC<props> = ({ title }) => {
    return (
        <button className='button'>
            {title}
        </button>
    );
}
export default MainBtn;