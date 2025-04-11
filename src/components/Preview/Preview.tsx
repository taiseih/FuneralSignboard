import React from 'react';
import styles from '../../styles/Preview.module.css'; // CSS Modulesをインポート

interface PreviewProps {
    lastName: string;
    firstName: string;
    eventDetails: string;
    background: string;
}

// forwardRefを使って親からrefを受け取れるようにする
const Preview = React.forwardRef<HTMLDivElement, PreviewProps>(
    ({ lastName, firstName, eventDetails, background }, ref) => {
        return (
            <div className={styles.previewWrapper}> {/* CSS Modulesを適用 */}
                {/* refを内部のdivに渡す */}
                <div className={styles.preview} ref={ref}>
                    <div
                        className={styles.previewBackground}
                        style={{ backgroundImage: `url(${background})` }}
                    >
                        {/* 日付・時刻エリア */}
                        <div className={`${styles.eventDetails} ${styles.verticalText}`}>
                            {eventDetails}
                        </div>

                        {/* 名前エリア */}
                        <div className={`${styles.fullName} ${styles.verticalText}`}>
                            <span className={styles.deceased}>故</span>
                            {/* 名前部分をラップして改行に対応 */}
                            <span className={styles.nameWrap}>{lastName} {firstName}</span>
                            <span className={styles.ceremony}>儀</span>
                            <span className={styles.hall}> 葬儀式場</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

// displayNameを設定（DevToolsでの表示用）
Preview.displayName = 'Preview';

export default Preview;