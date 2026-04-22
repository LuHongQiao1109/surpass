import React, { useEffect, useState } from "react";
import "./index.css"
import { TabList } from "./type"


const HeaderContent: React.FC = () => {
    const [tabList, setTabList] = useState<TabList[]>([])


    useEffect(() => {
        setTimeout(() => {
            let res: TabList[] = [
                { id: 1, tabName: "首页" },
                { id: 2, tabName: "日历" },
                { id: 3, tabName: "菜谱" },
                { id: 3, tabName: "个人中心" },
            ]
            console.log('%c 🍎嘿嘿87🍎:', 'color: CornflowerBlue; background: DeepPink; font-size: 20px;', res)
            setTabList(res)
        })
    }, [])


    return (
        <>
            <div>{tabList.map((item) => (
                <div key={item.id}>{item.tabName}</div>
            ))}</div>

        </>

    )
}

export default HeaderContent