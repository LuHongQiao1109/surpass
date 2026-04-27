import { useState } from 'react'

const TextCode: React.FC = () => {
    const [count, setCount] = useState(0)

    return (
        <div className=" bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-4xl font-bold text-indigo-600 mb-6">
                    Tailwind CSS 测试
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h2 className="text-lg font-semibold text-blue-800 mb-2">布局测试</h2>
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-500 rounded-full"></div>
                            <div className="w-12 h-12 bg-green-500 rounded-full"></div>
                            <div className="w-12 h-12 bg-red-500 rounded-full"></div>
                        </div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <h2 className="text-lg font-semibold text-green-800 mb-2">按钮测试</h2>
                        <div className="flex space-x-2">
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                                主要
                            </button>
                            <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition">
                                次要
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200 mb-8">
                    <h2 className="text-lg font-semibold text-indigo-800 mb-2">计数器测试</h2>
                    <button
                        onClick={() => setCount((count) => count + 1)}
                        className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition shadow-md"
                    >
                        计数：{count}
                    </button>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h2 className="text-lg font-semibold text-purple-800 mb-2">文字排版测试</h2>
                    <p className="text-gray-600 text-base leading-relaxed">
                        这是一段测试文字，使用了 Tailwind CSS 的排版工具类。
                        <span className="block mt-2 text-sm text-gray-500">
                            如果看到样式生效，说明 Tailwind CSS 配置成功！
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TextCode
