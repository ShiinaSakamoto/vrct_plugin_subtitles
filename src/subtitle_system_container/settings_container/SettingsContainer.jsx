// import React, { useState, useRef, useEffect } from "react";
// import { useStoreContext } from "@plugin_store";
import styles from "./SettingsContainer.module.scss";
import { useSubtitles } from "../_logics/useSubtitles";
import { Checkbox } from "@plugin_common_components";
// import clsx from "clsx";

export const SettingsContainer = () => {
    const {
        currentSendToChatbox,
        updateSendToChatbox,
    } = useSubtitles();

    return (
        <div className={styles.container}>
            <p className={styles.checkbox_label}>チャットボックスにも同時送信</p>
            <Checkbox
                variable={currentSendToChatbox}
                toggleFunction={() => updateSendToChatbox(!currentSendToChatbox.data)}
                size="2.4rem"
                padding="1rem"
            />
        </div>
    );
};