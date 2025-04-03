import React, { useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import { Button } from './components/Button'
import './App.css'

const backgroundImages = Array.from({ length: 10 }, (_, i) => `/bg${i + 1}.png`)
const fontSizes = ['text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl']

const App: React.FC = () => {
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [background, setBackground] = useState<string>(backgroundImages[0])
  const [customDate, setCustomDate] = useState<string>(() => {
    const today = new Date()
    return new Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
      era: 'long', year: 'numeric', month: 'long', day: 'numeric'
    }).format(today)
  })
  const [nameSize, setNameSize] = useState<string>('text-4xl')
  const [dateSize, setDateSize] = useState<string>('text-3xl')

  const previewRef = useRef<HTMLDivElement>(null)

  const handleDownload = async () => {
    if (previewRef.current) {
      const canvas = await html2canvas(previewRef.current)
      const link = document.createElement('a')
      link.download = 'preview.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
    }
  }

  return (
    <div className="container">
      {/* プレビューエリア */}
      <div className="preview" ref={previewRef}>
        <div
          className="preview-background"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className={`kanji-date vertical-text ${dateSize}`}>
            {customDate}
          </div>
          <div className={`full-name vertical-text center-name ${nameSize}`}>
            {lastName + firstName}
          </div>
        </div>
      </div>

      {/* 入力フォーム */}
      <div className="form">
        <div>
          <label className="label">名字</label>
          <input type="text" className="input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div>
          <label className="label">名前</label>
          <input type="text" className="input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div>
          <label className="label">日付（漢字表記）</label>
          <input type="text" className="input" value={customDate} onChange={(e) => setCustomDate(e.target.value)} />
        </div>
        <div>
          <label className="label">背景テンプレート</label>
          <select className="input" value={background} onChange={(e) => setBackground(e.target.value)}>
            {backgroundImages.map((img, idx) => (
              <option key={idx} value={img}>背景 {idx + 1}</option>
            ))}
          </select>
        </div>
        <Button onClick={handleDownload}>ダウンロード</Button>
      </div>
    </div>
  )
}

export default App
