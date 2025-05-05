// import React, { useState, useRef, useEffect } from "react";
import styles from "./PlayControlContainer.module.scss";
import { useSubtitles } from "../_logics/useSubtitles";
import clsx from "clsx";

export const PlayControlContainer = () => {
    const {
        currentIsSubtitlePlaying,
        handleSubtitlesStart,
        handleSubtitlesStop,
        currentSubtitleCues
    } = useSubtitles();

    const is_playing = currentIsSubtitlePlaying.data;

    const is_playable = currentSubtitleCues.data.length > 0;

    let label = "字幕が選択されていません";
    if (is_playable) label = "字幕を登録・再生";
    if (is_playing) label = "再生中";

    const playback_button_classname = clsx(styles.playback_button, {
        [styles.is_disabled]: is_playable === false,
        [styles.is_playing]: is_playing,
    });


    return (
        <div className={styles.container}>
            <button
                onClick={handleSubtitlesStart}
                className={playback_button_classname}
            >
                {label}
            </button>
            {is_playing &&
                <button onClick={handleSubtitlesStop} className={styles.playback_stop_button}>
                    停止
                </button>
            }
        </div>
    );
};