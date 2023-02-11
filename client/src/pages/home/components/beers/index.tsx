import React, { useState, useMemo } from 'react';
import { useQuery } from "react-query";

import { Beer } from './types'

import './styles.css'

const fetchBeers = async () => {
    return await (await fetch('https://api.sampleapis.com/beers/ale')).json()
}

const BeerComponent = ({ beer }: { beer: Beer }) => {
    return <div className='beerContainer'><img className='image' src={beer.image} alt='' /><div className='infosContainer'><span>{beer.name}</span><span>{beer.price}</span></div></div>
}

export const Beers = () => {
    const [visibleElements, setVisibleElements] = useState<number>(1);
    const { data: beers, isLoading } = useQuery<Beer[]>('beers', fetchBeers);
    const visibleArray = useMemo(() => beers?.slice(0, 9 * visibleElements), [beers, visibleElements]);

    if (!beers || !visibleArray) return null;
    if (isLoading) return <span>Beautiful loader</span>;

    const buttonVisible = visibleArray.length < beers.length;

    return <div className={'beersWrapper'}>
        <div className='beersContainer'>{visibleArray.map(beer => <BeerComponent beer={beer} />)}</div>
        {buttonVisible && <button className='button' onClick={() => setVisibleElements(visibleElements + 1)}>Show more</button>}
    </div>;
}