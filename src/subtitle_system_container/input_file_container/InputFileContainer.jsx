import React, { useState, useRef, useEffect } from "react";
import styles from "./InputFileContainer.module.scss";
import { useStoreContext } from "@plugin_store";
import { useSubtitles } from "../_logics/useSubtitles";
import { parseSRT, parseASS } from "../_subtitles_utils";

export const InputFileContainer = () => {
    const {
        updateSubtitleFileName,
        currentSubtitleFileName,
        updateSubtitleCues,
        handleSubtitlesStop
    } = useSubtitles();
    const inputRef = useRef(null);

    const { useSendTextToOverlay } = useStoreContext();
    const { sendTextToOverlay } = useSendTextToOverlay();

    // ファイルアップロード時の処理
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            let parsedCues = [];
            // 拡張子により ASS と SRT を判定
            if (file.name.toLowerCase().endsWith(".ass")) {
                parsedCues = parseASS(content);
            } else {
                parsedCues = parseSRT(content);
            }
            updateSubtitleCues(parsedCues);
            console.log("Parsed cues:", parsedCues);
            updateSubtitleFileName(file.name);
            sendTextToOverlay(`字幕ファイル「${file.name}」を読み込みました。`);


        };
        reader.readAsText(file);
    };


    // ファイルクリア
    const handleClearFile = () => {
        handleSubtitlesStop();
        updateSubtitleFileName("ファイルが選択されていません");
        updateSubtitleCues([]);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.input_file_wrapper}>
                <label htmlFor="subtitle_file_input" className={styles.input_file_label}>字幕ファイルを選択</label>
                <input
                    id="subtitle_file_input"
                    type="file"
                    accept=".srt,.ass"
                    ref={inputRef}
                    onChange={handleFileUpload}
                    className={styles.input_file_i}
                />
                <p className={styles.file_name}>{currentSubtitleFileName.data}</p>
            </div>
            <button onClick={handleClearFile} className={styles.file_clear}>
                ファイルクリア
            </button>
        </div>
    );
};