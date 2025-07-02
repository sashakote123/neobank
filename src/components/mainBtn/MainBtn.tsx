import "./styles.css";
interface Props {
  title: string;
  onClick?: () => void;
}

const MainBtn: React.FC<Props> = ({ title, onClick }) => {
  return (
    <button onClick={onClick} className="button">
      {title}
    </button>
  );
};
export default MainBtn;
