import { useState } from 'react'
import '@/App.css'

const TextCode: React.FC = () => {
    const [count, setCount] = useState(0)


    // console.log('%c 🐘嘿嘿55🐘:', 'color: Orchid; background: Indigo; font-size: 20px;', count)
    return (
        <>
            <div>
                <h1>React + Vite</h1>
            </div>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default TextCode
