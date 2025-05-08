// import React, { useState, useRef, useEffect } from "react";
import { useStoreContext } from "@plugin_store";
import styles from "./PlayControlContainer.module.scss";
import { useSubtitles } from "../_logics/useSubtitles";
import clsx from "clsx";

export const PlayControlContainer = () => {
    const {
        currentIsSubtitlePlaying,
        handleSubtitlesStart,
        handleSubtitlesStop,
        currentIsPlayable,
    } = useSubtitles();

    const { useIsEnabledOverlaySmallLog } = useStoreContext();
    const { currentIsEnabledOverlaySmallLog } = useIsEnabledOverlaySmallLog();

    const is_enabled_overlay = currentIsEnabledOverlaySmallLog.data;

    const is_playing = currentIsSubtitlePlaying.data;

    let label = "字幕が選択されていません";
    if (currentIsPlayable.data) label = "字幕を登録・再生";
    if (!is_enabled_overlay) label = "Overlay機能(VR)「一行」を有効にしてください";
    if (is_playing) label = "再生中";

    const playback_button_classname = clsx(styles.playback_button, {
        [styles.is_disabled]: currentIsPlayable.data === false,
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