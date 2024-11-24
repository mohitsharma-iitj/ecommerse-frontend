import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { mainCarouseldData } from './MaincarosalData';




const MainCrosel = () => {
    // const navigate =  useNavi
    const items = mainCarouseldData.map((item) => <img className='cursor-pointer -z-10' role='presentation' src={item.image} alt />)

    return (
        < AliceCarousel
            items={items}
            disableButtonsControls
            autoPlay
            autoPlayInterval={1000}
            infinite
        />
    )
}

export default MainCrosel;