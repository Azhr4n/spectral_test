import { Header } from './components/header';
import { Beers } from './components/beers';

import './home.css';

const Counter = () => {
    return <div className='counterContainer'><span>Compteur :</span><input type="number" min={0} /></div>;
}

export const Home = () => {
    return <div className='homepage'><Header /><Counter /><Beers /></div>;
}