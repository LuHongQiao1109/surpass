import React, { useEffect, useState } from "react";
import "./index.css"
import { TabList } from "./type"


const HeaderContent: React.FC = () => {
    const [tabList, setTabList] = useState<TabList[]>([])

    const [clickActive, setClickActive] = useState<boolean>(false)

    useEffect(() => {
        setTimeout(() => {
            let res: TabList[] = [
                { id: 1, tabName: "首页" },
                { id: 2, tabName: "个人中心" },
            ]
          console.log('%c 🍎嘿嘿87🍎:', 'color: CornflowerBlue; background: DeepPink; font-size: 20px;', res)
            setTabList(res)
        })
    }, [])


    useEffect(() => {
    }, [clickActive])

    const changeColor = () => {
        setClickActive(!clickActive)
    }

    return (
        <>

            <div
                className={`headerStyle ${clickActive ? 'active' : ''}`}
                onClick={changeColor}
            >
                抬头
            </div >

            <div>{ tabList.map((item) => (
                <div key={item.id}>{item.tabName}</div>
            ))}</div>

        </>

    )
}

export default HeaderContent