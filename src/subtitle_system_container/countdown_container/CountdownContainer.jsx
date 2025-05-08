import React, { useState, useRef, useEffect } from "react";
import styles from "./CountdownContainer.module.scss";
import { secToDayTime } from "../_subtitles_utils";
import { useSubtitles } from "../_logics/useSubtitles";

export const CountdownContainer = () => {
    const {
        updateCountdownAdjustment,
        currentEffectiveCountdown,
        currentIsCuesScheduled,
        startCountdownInterval,
        currentSubtitlePlaybackMode,
        currentIsStarted,
        currentIsSubtitlePlaying,
    } = useSubtitles();

    // if (currentEffectiveCountdown.data === 0) return null;
    if (currentEffectiveCountdown.data === null && currentIsCuesScheduled.data) return null;

    let count_label = "";
    if (currentSubtitlePlaybackMode.data === "relative" && currentEffectiveCountdown.data === null) {
        count_label = "00:10";
    } else {
        count_label = secToDayTime(currentEffectiveCountdown.data);
    }
    let label = `カウントダウン: ${count_label}`;

    if (currentIsStarted.data) label = "再生中";

    return (
        <div className={styles.container}>
            <span>{label}</span>
            {currentSubtitlePlaybackMode.data === "absolute" && currentIsSubtitlePlaying.data && !currentIsStarted.data &&
                <div className={styles.adjust_button_container}>
                    {/* 1分単位の調整ボタン */}
                    <div className={styles.adjust_button_wrapper}>
                        <button
                            onClick={() => {
                                const newValue = currentEffectiveCountdown.data + 60;
                                updateCountdownAdjustment((prev) => prev.data + 60);
                                startCountdownInterval(newValue);
                            }}
                            className={styles.adjust_button}
                            >
                            ▲ 1分
                        </button>
                        <button
                            onClick={() => {
                                const newValue = currentEffectiveCountdown.data - 60;
                                updateCountdownAdjustment((prev) => prev.data - 60);
                                startCountdownInterval(newValue);
                            }}
                            className={styles.adjust_button}
                            >
                            ▼ 1分
                        </button>
                    </div>
                    <div className={styles.adjust_button_border}></div>
                    {/* 1秒単位の調整ボタン */}
                    <div className={styles.adjust_button_wrapper}>
                        <button
                            onClick={() => {
                                const newValue = currentEffectiveCountdown.data + 1;
                                updateCountdownAdjustment((prev) => prev.data + 1);
                                startCountdownInterval(newValue);
                            }}
                            className={styles.adjust_button}
                        >
                            ▲ 1秒
                        </button>
                        <button
                            onClick={() => {
                                const newValue = currentEffectiveCountdown.data - 1;
                                updateCountdownAdjustment((prev) => prev.data - 1);
                                startCountdownInterval(newValue);
                            }}
                            className={styles.adjust_button}
                        >
                            ▼ 1秒
                        </button>
                    </div>
                </div>
            }
        </div>
    );
};