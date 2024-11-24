import React, { useState, useRef } from 'react';
import AliceCarousel from 'react-alice-carousel';
import HomeSectionCard from '../HomesectionCard/HomesectionCard';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Button from '@mui/material/Button';
import { mens_kurta } from '../../../Data/mens_kurta';

const HomeSectionCarosel = ({ data, sectionName }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselRef = useRef(null);

    const responsive = {
        0: { items: 1 },
        720: { items: 3 },
        1024: { items: 5.5 },
    };

    const slidePrev = () => {
        if (activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
            carouselRef.current.slidePrev();
        }
    };

    const slideNext = () => {
        if (activeIndex < mens_kurta.length - 5) {  // Adjust this based on how many items you want to display
            setActiveIndex(activeIndex + 1);
            carouselRef.current.slideNext();
        }
    };

    const items = data.slice(0, 10).map((item) => (
        <HomeSectionCard key={item.id} product={item} />
    ));

    return (
        <div className='border'>
            <h2 className='text-2xl font-extrabold text-gray-800 py-5 px-5'>{sectionName}</h2>
            <div className='relative p-2'>
                <AliceCarousel
                    ref={carouselRef}
                    items={items}
                    disableButtonsControls
                    responsive={responsive}
                    disableDotsControls
                    activeIndex={activeIndex}
                    onSlideChanged={({ item }) => setActiveIndex(item)}
                />

                {activeIndex !== items.length - 5 && (
                    <Button
                        variant="contained"
                        className="z-50 bg-white"
                        onClick={slideNext}
                        sx={{
                            position: "absolute",
                            top: "8rem",
                            right: "0",
                            transform: "translateX(50%) rotate(90deg)",
                            bgcolor: "white",
                        }}
                        aria-label="next"
                    >
                        <KeyboardArrowLeftIcon style={{ transform: "rotate(90deg)", color: "black" }} />
                    </Button>
                )}

                {activeIndex !== 0 && <Button
                    variant="contained"
                    className="z-50 bg-white"
                    onClick={slidePrev}
                    sx={{
                        position: "absolute",
                        top: "8rem",
                        left: "0",
                        transform: "translateX(-50%) rotate(-90deg)",
                        bgcolor: "white",
                    }}
                    aria-label="prev"
                >
                    <KeyboardArrowLeftIcon style={{ transform: "rotate(90deg)", color: "black" }} />
                </Button>}
            </div>
        </div>
    );
};

export default HomeSectionCarosel;
