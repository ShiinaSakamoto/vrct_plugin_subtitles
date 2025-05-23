import React, { useState, useRef, useEffect } from "react";
import styles from "./SubtitlesListContainer.module.scss";
import { useSubtitles } from "../_logics/useSubtitles";
import { formatTime } from "../_subtitles_utils";

export const SubtitlesListContainer = () => {
    const { currentSubtitleCues, handleJump } = useSubtitles();

    if (currentSubtitleCues.data.length < 0 ) return null;

    return (
        <div className={styles.subtitle_section}>
            <h2>字幕一覧</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th></th>
                        <th>番号</th>
                        <th>開始</th>
                        {/* <th>終了</th> */}
                        <th>Actor</th>
                        <th>テキスト</th>
                    </tr>
                </thead>
                <tbody className={styles.subtitle_lists}>
                    {currentSubtitleCues.data.map((cue) => (
                        <tr
                            key={cue.index}
                            className={styles.tableRow}
                        >
                            <td
                                className={styles.play_button_wrapper}
                                onClick={() => handleJump(cue)}>
                                ここから再生
                            </td>
                            <td>{cue.index}</td>
                            <td>{formatTime(cue.startTime)}</td>
                            {/* <td>{formatTime(cue.endTime)}</td> */}
                            <td>{cue.actor}</td>
                            <td>{cue.text}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};