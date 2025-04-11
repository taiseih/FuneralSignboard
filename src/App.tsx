import React, { useState, useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';
import Preview from './components/Preview/Preview';
import InputForm from './components/InputForm/InputForm';
import './styles/App.css'; // Appコンポーネント用のCSS (レイアウト変更を反映)

// 背景画像リスト
const backgroundImages = Array.from({ length: 10 }, (_, i) => `/assets/bg${i + 1}.png`); // パスを確認

const App: React.FC = () => {
  // --- State Definitions (変更なし) ---
  const [lastName, setLastName] = useState<string>('山田');
  const [firstName, setFirstName] = useState<string>('太郎');
  const [background, setBackground] = useState<string>(backgroundImages[0]);
  const [eventType, setEventType] = useState<string>('通夜・告別式');
  const [eventDate, setEventDate] = useState<string>('四月十二日');
  const [startTime, setStartTime] = useState<string>('十八時〇〇分');
  const [endTime, setEndTime] = useState<string>('十九時〇〇分');

  const previewRef = useRef<HTMLDivElement>(null);

  // --- Download Handler (変更なし) ---
  const handleDownload = useCallback(async () => {
    if (previewRef.current) {
      try {
        const canvas = await html2canvas(previewRef.current, {
          useCORS: true,
          backgroundColor: null,
          scale: window.devicePixelRatio > 1 ? 2 : 1,
        });
        const link = document.createElement('a');
        link.download = `announcement_${lastName}${firstName}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (error) {
        console.error("画像のダウンロードに失敗しました:", error);
      }
    }
  }, [lastName, firstName]);

  // --- Ceremony Details String (変更なし) ---
  const ceremonyDetails = `${eventType} ${eventDate} ${startTime}～${endTime}`;

  // --- Input Change Handlers (変更なし) ---
  const handleLastNameChange = useCallback((value: string) => setLastName(value), []);
  const handleFirstNameChange = useCallback((value: string) => setFirstName(value), []);
  const handleEventTypeChange = useCallback((value: string) => setEventType(value), []);
  const handleEventDateChange = useCallback((value: string) => setEventDate(value), []);
  const handleStartTimeChange = useCallback((value: string) => setStartTime(value), []);
  const handleEndTimeChange = useCallback((value: string) => setEndTime(value), []);
  const handleBackgroundChange = useCallback((value: string) => setBackground(value), []);


  return (
    // className は App.css で定義されたものを使用
    <div className="appContainer">
      <Preview
        ref={previewRef}
        lastName={lastName}
        firstName={firstName}
        eventDetails={ceremonyDetails}
        background={background}
      />

      <InputForm
        lastName={lastName}
        onLastNameChange={handleLastNameChange}
        firstName={firstName}
        onFirstNameChange={handleFirstNameChange}
        eventType={eventType}
        onEventTypeChange={handleEventTypeChange}
        eventDate={eventDate}
        onEventDateChange={handleEventDateChange}
        startTime={startTime}
        onStartTimeChange={handleStartTimeChange}
        endTime={endTime}
        onEndTimeChange={handleEndTimeChange}
        background={background}
        onBackgroundChange={handleBackgroundChange}
        backgroundImages={backgroundImages}
        onDownload={handleDownload}
      />
    </div>
  );
};

export default App;