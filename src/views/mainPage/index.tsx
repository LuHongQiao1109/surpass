import React, { useEffect, useState } from "react";
import "./index.css"


const HeaderContent: React.FC = () => {
    const [tabList, setTabList] = useState([])

    const [clickActive, setClickActive] = useState(false)


    useEffect(() => {
        console.log('%c 🍎嘿嘿15🍎:', 'color: Aquamarine; background: DarkOrange; font-size: 20px;', clickActive)
    }, [clickActive])

    const changeColor = () => {
        setClickActive(!clickActive)
    }

    return (

        <div
            className={`headerStyle ${clickActive ? 'active' : ''}`}
            onClick={changeColor}
        >
            抬头
        </div >
    )
}

export default HeaderContent