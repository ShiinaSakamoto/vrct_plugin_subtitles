// import React, { useState, useRef, useEffect } from "react";
import styles from "./HeaderContainer.module.scss";
import clsx from "clsx";
import { usePluginTranslation } from "@usePluginTranslation";
import ExternalLink from "@images_plugin/external_link.svg?react";

export const HeaderContainer = () => {
    const { t } = usePluginTranslation();

    return (
        <div className={styles.container}>
            <div className={styles.link_button_wrapper}>
                <a className={styles.link_button} href="https://github.com/ShiinaSakamoto/vrct_plugin_subtitles_list" target="_blank" rel="noreferrer" >
                    <p className={styles.link_text}>字幕データを取得（Github）</p>
                    <ExternalLink className={styles.external_link_svg} />
                </a>
            </div>
            <div className={styles.title_wrapper}>
                <h1 className={styles.title}>{t("main_page.title")}</h1>
            </div>
        </div>
    );
};