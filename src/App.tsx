import React, { useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import { Button } from './components/Button'
import './App.css'
import { backgroundImages, fontColors, fontFamilies, fontSizes } from './constants/const'


const App: React.FC = () => {
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [background, setBackground] = useState<string>(backgroundImages[0])
  const [customDate, setCustomDate] = useState<string>(() => {
    const today = new Date()
    const formattedDate = `${String(today.getMonth() + 1).padStart(2, '')}月${String(today.getDate()).padStart(2, '')}日`
    return formattedDate
  })
  const [customTime, setCustomTime] = useState<string>('12時00分〜13時00分')

  // 通夜・告別式のテキスト
  const wakeText = '通夜'
  const funeralText = '告別式'

  // 新しいステート変数
  const [nameFont, setNameFont] = useState<string>(fontFamilies[0].value)
  const [dateFont, setDateFont] = useState<string>(fontFamilies[0].value)
  const [nameSize, setNameSize] = useState<string>(fontSizes[4].value)
  const [dateSize, setDateSize] = useState<string>(fontSizes[2].value)
  const [nameColor, setNameColor] = useState<string>(fontColors[0].value)
  const [dateColor, setDateColor] = useState<string>(fontColors[0].value)
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
              fontFamily: dateFont,
              fontSize: dateSize,
              color: dateColor,
              opacity: dateOpacity / 100,
              ...getTextStrokeStyle(dateStroke)
            }}
          >
            <div>{wakeText}・{funeralText} {customDate} {customTime}</div>
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
            <input type="date" className="input" value={customDate} onChange={(e) => setCustomDate(e.target.value)} />
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