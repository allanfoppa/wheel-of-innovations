import { Image } from '@chakra-ui/react'
import logo from '../../assets/logo-white.png';

export const Logo: React.FC = () => {
  return (
    <Image
      src={logo}
      alt="logo"
      width={20}
    />
  );
}
