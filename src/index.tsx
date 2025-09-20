import { Heron } from "./components/icons/Heron"
import { ThothButton } from "./components/ThothButton"
import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'

// 插入Shadow DOM、挂载React应用
function App() {
    const [selectedText, setSelectedText] = useState('');
    const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

    useEffect(() => {
        const onMouseUp = (e: MouseEvent) => {
            const sel = window.getSelection()
            const text = sel?.toString().trim()
            if (text) {
                const range = sel?.getRangeAt(0)
                const rect = range?.getBoundingClientRect()
                if (rect) {
                    setSelectedText(text)
                    setPosition({ x: rect.right + window.scrollX, y: rect.top + window.scrollY })
                }
            } else {
                setSelectedText('')
                setPosition(null)
            }
        }

        document.addEventListener('mouseup', onMouseUp)
        return () => document.removeEventListener('mouseup', onMouseUp)
    }, [])

    return (
        <>
            {
                selectedText && position && (
                    <ThothButton label={'ask ai'} icon={<Heron />} onClick={() => {
                        console.log('Button clicked, label:', 'ask ai!!!!!!!');
                        setSelectedText(selectedText);
                        console.log("======咋回事捏======");
                    }} />
                )
            }
        </>
    )
}

const container = document.createElement('div')
const shadow = container.attachShadow({ mode: 'open' })
document.documentElement.appendChild(container)

const appRoot = document.createElement('div')
shadow.appendChild(appRoot)
createRoot(appRoot).render(<App />)