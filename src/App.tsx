import React, { useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import { Button } from './components/Button'
import './App.css'

// 背景画像のリスト
const backgroundImages = [
  '/images(1).jpeg',
  '/450-20210928114557411222.jpg',
  '/450-20210928114633411222.jpg',
  '/31466_sample.png',
  '/83207_sample.png',
  '/images(2).jpeg',
  '/images(3).jpeg',
  '/images.jpeg',
  '/31466_sample.png',
  '/38EAE8D8E62C1BFD715E571DBDEB46ADE38161FD.jpeg'
]

// 利用可能なフォントのリスト
const fontFamilies = [
  { name: '明朝体', value: "'Shippori Mincho', serif" },
  { name: 'ゴシック体', value: "'Noto Sans JP', sans-serif" },
  { name: '筆文字風', value: "'Klee One', cursive" },
  { name: '丸ゴシック', value: "'M PLUS Rounded 1c', sans-serif" },
  { name: '教科書体', value: "'BIZ UDGothic', sans-serif" },
  { name: '毛筆体', value: "'Zen Kaku Gothic New', sans-serif" }
]

// 文字サイズのオプション
const fontSizes = [
  { name: '極小', value: '16px' },
  { name: '小', value: '24px' },
  { name: '中', value: '36px' },
  { name: '大', value: '48px' },
  { name: '特大', value: '64px' },
  { name: '超特大', value: '80px' }
]

// 文字色のオプション
const fontColors = [
  { name: '黒', value: '#000000' },
  { name: '白', value: '#FFFFFF' },
  { name: '赤', value: '#FF0000' },
  { name: '青', value: '#0000FF' },
  { name: '金', value: '#FFD700' },
  { name: '銀', value: '#C0C0C0' }
]

// 日付位置のオプション
const datePositions = [
  { name: '左上', value: 'top-left' },
  { name: '右上', value: 'top-right' },
  { name: '左下', value: 'bottom-left' },
  { name: '右下', value: 'bottom-right' }
]

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
  const [customTime, setCustomTime] = useState<string>('')

  // 新しいステート変数
  const [nameFont, setNameFont] = useState<string>(fontFamilies[0].value)
  const [dateFont, setDateFont] = useState<string>(fontFamilies[0].value)
  const [nameSize, setNameSize] = useState<string>(fontSizes[4].value)
  const [dateSize, setDateSize] = useState<string>(fontSizes[2].value)
  const [nameColor, setNameColor] = useState<string>(fontColors[0].value)
  const [dateColor, setDateColor] = useState<string>(fontColors[0].value)
  const [datePosition, setDatePosition] = useState<string>(datePositions[0].value)
  const [nameStroke, setNameStroke] = useState<boolean>(false)
  const [dateStroke, setDateStroke] = useState<boolean>(false)
  const [strokeColor, setStrokeColor] = useState<string>('#FFFFFF')
  const [strokeWidth, setStrokeWidth] = useState<number>(1)
  const [nameOpacity, setNameOpacity] = useState<number>(100)
  const [dateOpacity, setDateOpacity] = useState<number>(100)
  const [overlay, setOverlay] = useState<boolean>(false)
  const [overlayColor, setOverlayColor] = useState<string>('rgba(255, 255, 255, 0.3)')

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

  // 日付位置のスタイルを計算する関数
  const getDatePositionStyle = () => {
    switch (datePosition) {
      case 'top-right':
        return { top: '1rem', right: '1rem', left: 'auto' }
      case 'bottom-left':
        return { top: 'auto', bottom: '1rem', left: '1rem' }
      case 'bottom-right':
        return { top: 'auto', bottom: '1rem', right: '1rem', left: 'auto' }
      default: // top-left または未定義の場合
        return { top: '1rem', left: '1rem' }
    }
  }

  // テキストのストロークスタイルを計算
  const getTextStrokeStyle = (useStroke: boolean) => {
    if (!useStroke) return {}
    return {
      WebkitTextStroke: `${strokeWidth}px ${strokeColor}`,
      textStroke: `${strokeWidth}px ${strokeColor}`
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
          {overlay && (
            <div className="overlay" style={{
              background: overlayColor,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}></div>
          )}

          <div
            className="kanji-date vertical-text"
            style={{
              ...getDatePositionStyle(),
              fontFamily: dateFont,
              fontSize: dateSize,
              color: dateColor,
              opacity: dateOpacity / 100,
              ...getTextStrokeStyle(dateStroke)
            }}
          >
            {customDate} {customTime}
          </div>

          <div
            className="full-name vertical-text center-name"
            style={{
              fontFamily: nameFont,
              fontSize: nameSize,
              color: nameColor,
              opacity: nameOpacity / 100,
              ...getTextStrokeStyle(nameStroke)
            }}
          >
            {lastName + firstName}
          </div>
        </div>
      </div>

      {/* 入力フォーム */}
      <div className="form">
        <div className="form-section">
          <h3 className="section-title">基本情報</h3>
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
            <label className="label">時刻（漢字表記）</label>
            <input type="text" className="input" value={customTime} onChange={(e) => setCustomTime(e.target.value)} />
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">名前のスタイル</h3>
          <div>
            <label className="label">フォント</label>
            <select className="input" value={nameFont} onChange={(e) => setNameFont(e.target.value)}>
              {fontFamilies.map((font, idx) => (
                <option key={idx} value={font.value}>{font.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">文字サイズ</label>
            <select className="input" value={nameSize} onChange={(e) => setNameSize(e.target.value)}>
              {fontSizes.map((size, idx) => (
                <option key={idx} value={size.value}>{size.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">文字色</label>
            <select className="input" value={nameColor} onChange={(e) => setNameColor(e.target.value)}>
              {fontColors.map((color, idx) => (
                <option key={idx} value={color.value}>{color.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">不透明度</label>
            <input
              type="range"
              min="0"
              max="100"
              value={nameOpacity}
              onChange={(e) => setNameOpacity(parseInt(e.target.value))}
              className="slider"
            />
            <span>{nameOpacity}%</span>
          </div>
          <div>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={nameStroke}
                onChange={(e) => setNameStroke(e.target.checked)}
              />
              縁取りを追加
            </label>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">日付のスタイル</h3>
          <div>
            <label className="label">フォント</label>
            <select className="input" value={dateFont} onChange={(e) => setDateFont(e.target.value)}>
              {fontFamilies.map((font, idx) => (
                <option key={idx} value={font.value}>{font.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">文字サイズ</label>
            <select className="input" value={dateSize} onChange={(e) => setDateSize(e.target.value)}>
              {fontSizes.map((size, idx) => (
                <option key={idx} value={size.value}>{size.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">文字色</label>
            <select className="input" value={dateColor} onChange={(e) => setDateColor(e.target.value)}>
              {fontColors.map((color, idx) => (
                <option key={idx} value={color.value}>{color.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">位置</label>
            <select className="input" value={datePosition} onChange={(e) => setDatePosition(e.target.value)}>
              {datePositions.map((pos, idx) => (
                <option key={idx} value={pos.value}>{pos.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">不透明度</label>
            <input
              type="range"
              min="0"
              max="100"
              value={dateOpacity}
              onChange={(e) => setDateOpacity(parseInt(e.target.value))}
              className="slider"
            />
            <span>{dateOpacity}%</span>
          </div>
          <div>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={dateStroke}
                onChange={(e) => setDateStroke(e.target.checked)}
              />
              縁取りを追加
            </label>
          </div>
        </div>

        {(nameStroke || dateStroke) && (
          <div className="form-section">
            <h3 className="section-title">縁取り設定</h3>
            <div>
              <label className="label">縁取り色</label>
              <select className="input" value={strokeColor} onChange={(e) => setStrokeColor(e.target.value)}>
                {fontColors.map((color, idx) => (
                  <option key={idx} value={color.value}>{color.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">縁取り太さ</label>
              <input
                type="range"
                min="1"
                max="5"
                value={strokeWidth}
                onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
                className="slider"
              />
              <span>{strokeWidth}px</span>
            </div>
          </div>
        )}

        <div className="form-section">
          <h3 className="section-title">背景設定</h3>
          <div>
            <label className="label">背景テンプレート</label>
            <select className="input" value={background} onChange={(e) => setBackground(e.target.value)}>
              {backgroundImages.map((img, idx) => (
                <option key={idx} value={img}>背景 {idx + 1}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={overlay}
                onChange={(e) => setOverlay(e.target.checked)}
              />
              オーバーレイを追加
            </label>
          </div>
          {overlay && (
            <div>
              <label className="label">オーバーレイの色</label>
              <select className="input" value={overlayColor} onChange={(e) => setOverlayColor(e.target.value)}>
                <option value="rgba(255, 255, 255, 0.3)">白 (30%)</option>
                <option value="rgba(0, 0, 0, 0.3)">黒 (30%)</option>
                <option value="rgba(255, 255, 255, 0.5)">白 (50%)</option>
                <option value="rgba(0, 0, 0, 0.5)">黒 (50%)</option>
              </select>
            </div>
          )}
        </div>

        <Button onClick={handleDownload}>ダウンロード</Button>
      </div>
    </div>
  )
}

export default App