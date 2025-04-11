import React from 'react';
import Button from '../Button/Button'; // Buttonコンポーネントをインポート
import styles from '../../styles/InputForm.module.css'; // CSS Modulesをインポート

// 親から受け取るPropsの型定義
interface InputFormProps {
    lastName: string;
    onLastNameChange: (value: string) => void;
    firstName: string;
    onFirstNameChange: (value: string) => void;
    eventType: string;
    onEventTypeChange: (value: string) => void;
    eventDate: string;
    onEventDateChange: (value: string) => void;
    startTime: string;
    onStartTimeChange: (value: string) => void;
    endTime: string;
    onEndTimeChange: (value: string) => void;
    background: string;
    onBackgroundChange: (value: string) => void;
    backgroundImages: string[];
    onDownload: () => void; // ダウンロード処理の関数
}

const InputForm: React.FC<InputFormProps> = ({
    lastName, onLastNameChange,
    firstName, onFirstNameChange,
    eventType, onEventTypeChange,
    eventDate, onEventDateChange,
    startTime, onStartTimeChange,
    endTime, onEndTimeChange,
    background, onBackgroundChange,
    backgroundImages,
    onDownload,
}) => {
    return (
        <div className={styles.form}> {/* CSS Modulesを適用 */}
            <div>
                <label className={styles.label}>名字</label>
                <input
                    type="text"
                    className={styles.input}
                    value={lastName}
                    onChange={(e) => onLastNameChange(e.target.value)}
                />
            </div>
            <div>
                <label className={styles.label}>名前</label>
                <input
                    type="text"
                    className={styles.input}
                    value={firstName}
                    onChange={(e) => onFirstNameChange(e.target.value)}
                />
            </div>
            <div>
                <label className={styles.label}>形式 (例: 通夜・告別式)</label>
                <input
                    type="text"
                    className={styles.input}
                    value={eventType}
                    onChange={(e) => onEventTypeChange(e.target.value)}
                />
            </div>
            <div>
                <label className={styles.label}>日付 (例: 四月十二日)</label>
                <input
                    type="text"
                    className={styles.input}
                    value={eventDate}
                    onChange={(e) => onEventDateChange(e.target.value)}
                />
            </div>
            <div>
                <label className={styles.label}>開始時間 (例: 十八時〇〇分)</label>
                <input
                    type="text"
                    className={styles.input}
                    value={startTime}
                    onChange={(e) => onStartTimeChange(e.target.value)}
                />
            </div>
            <div>
                <label className={styles.label}>終了時間 (例: 十九時〇〇分)</label>
                <input
                    type="text"
                    className={styles.input}
                    value={endTime}
                    onChange={(e) => onEndTimeChange(e.target.value)}
                />
            </div>
            <div>
                <label className={styles.label}>背景テンプレート</label>
                <select
                    className={styles.input} // inputと同じスタイルを適用
                    value={background}
                    onChange={(e) => onBackgroundChange(e.target.value)}
                >
                    {backgroundImages.map((img, idx) => (
                        <option key={idx} value={img}>背景 {idx + 1}</option>
                    ))}
                </select>
            </div>
            {/* Buttonコンポーネントを使用 */}
            <Button onClick={onDownload}>ダウンロード</Button>
        </div>
    );
};

export default InputForm;