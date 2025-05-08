import { useStoreContext } from "@plugin_store";

import { useSubtitles } from "../_logics/useSubtitles";
import { secToDayTime } from "../_subtitles_utils"
import { useEffect } from "react";
export const SubtitlesController = () => {
    const { useSendTextToOverlay, useIsEnabledOverlaySmallLog } = useStoreContext();
    const { sendTextToOverlay } = useSendTextToOverlay();
    const { currentIsEnabledOverlaySmallLog } = useIsEnabledOverlaySmallLog();

    const {
        currentIsSubtitlePlaying,
        updateIsStarted,
        currentIsCuesScheduled,
        updateIsCuesScheduled,
        currentCountdownAdjustment,
        currentEffectiveCountdown,
        scheduleCues,
        updateIsPlayable,
        currentSubtitleCues,
    } = useSubtitles();

    // currentEffectiveCountdown.data が 0 になったとき、字幕開始
    useEffect(() => {
        if (
            currentIsSubtitlePlaying.data &&
            currentEffectiveCountdown.data !== null &&
            currentEffectiveCountdown.data <= 0 &&
            !currentIsCuesScheduled.data
        ) {
            sendTextToOverlay(`${secToDayTime(currentEffectiveCountdown.data)} スタート！`);
            console.log(`${secToDayTime(currentEffectiveCountdown.data)} スタート！`);
            // 調整後のタイミングで字幕スケジュールを開始
            scheduleCues(0);
            updateIsCuesScheduled(true);
            updateIsStarted(true);
        }

        if (currentEffectiveCountdown.data > 0) {
            console.log(secToDayTime(currentEffectiveCountdown.data));
            sendTextToOverlay(secToDayTime(currentEffectiveCountdown.data));
        }

    }, [currentEffectiveCountdown.data, currentIsSubtitlePlaying.data, currentIsCuesScheduled.data, currentCountdownAdjustment.data]);

    useEffect(() => {
        const is_playable = currentIsEnabledOverlaySmallLog.data && currentSubtitleCues.data.length > 0;
        updateIsPlayable(is_playable);
    }, [currentIsEnabledOverlaySmallLog.data, currentSubtitleCues.data.length]);

    return null;
};