import { IoHomeSharp } from 'react-icons/io5';
import { MdOutlineBorderColor, MdQueryStats } from 'react-icons/md';
import {SiAboutdotme} from 'react-icons/si'
import { ImProfile, ImStatsBars } from 'react-icons/im';

import {ImStatsDots} from 'react-icons/im'
const links = [
  {
    id: 1,
    text: 'Home',
    path: '/landing',
    icon: <IoHomeSharp />,
  },
  {
    id: 7,
    text: ' about',
    path: '/about',
    icon: <SiAboutdotme />,
  },
  {
    id: 2,
    text: 'Account',
    path: '/',
    icon: <ImProfile />,
  },
  {
    id: 3,
    text: 'My Orders',
    path: '/my-orders',
    icon: <MdOutlineBorderColor />,
  },
  
];


export default links;