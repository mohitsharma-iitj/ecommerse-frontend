import React from "react"
import MainCrosel from "../../components/HomeCarousal/MainCrosel"
import HomeSectionCarosel from '../../components/HomeSectionCarosel/HomeSectionCarosal';
import { mens_kurta } from "../../../Data/mens_kurta";

import Footer from "../../components/Footer/Footer";

const HomePage = () => {
    return (
        <div>
            <MainCrosel />


            <div className='space-y-10 py-20  flex flex-col justify-center px-5 lg:px-10'>
                <HomeSectionCarosel data={mens_kurta} sectionName={"Mens_kurta"} />
                <HomeSectionCarosel data={mens_kurta} />
                <HomeSectionCarosel data={mens_kurta} />
            </div>

        </div>



    )
}

export default HomePage