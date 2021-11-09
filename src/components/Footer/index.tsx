import { useHistory } from 'react-router-dom';
import SearchInput from '../shared/SearchInput';
import Button from '../shared/Button';
import Logo from '../../assets/TOURist-white.png';
import { ReactComponent as FacebookIcon } from '../../assets/icons/facebook.svg';
import { ReactComponent as LineIcon } from '../../assets/icons/line.svg';
import { ReactComponent as TwitterIcon } from '../../assets/icons/twitter.svg';

const Footer = () => {
  const history = useHistory();
  return (
    <footer className="h-24 flex justify-center items-center bg-primary text-white text-sm">
      <div className="w-4/5 flex justify-between">
        <div className="flex flex-col">
          <img
            src={Logo}
            alt="logo"
            className="h-4 w-auto mr-8 cursor-pointer mb-2"
            onClick={() => history.push('/')}
          />
          <div className="flex text-primary">
            <FacebookIcon className="mr-1 cursor-pointer" />
            <LineIcon className="mr-1 cursor-pointer" />
            <TwitterIcon className="cursor-pointer" />
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex flex-col items-center pr-2">
            <div>找景點</div>
            <div>主題景點</div>
          </div>
          <div className="flex flex-col items-center pr-2">
            <div>找餐廳</div>
            <div>主題餐廳</div>
          </div>
          <div className="flex flex-col items-center pr-2">
            <div>找飯店</div>
            <div>嚴選飯店</div>
          </div>
        </div>
        <div className="flex items-center">Copyright ©</div>
      </div>
    </footer>
  );
};

export default Footer;
