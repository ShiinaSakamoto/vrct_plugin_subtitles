import { useStore } from "../store/store";
import { useEffect } from "react";

export const MainContainer = () => {
    const { updateCountPluginState, currentCountPluginState } = useStore("useStore_CountPluginState");

    const incrementCount = () => {
        updateCountPluginState((prev_value) => ({
            count: prev_value.data.count + 1,
        }));
    };

    useEffect(() => {
        console.log(currentCountPluginState.data);

    }, [currentCountPluginState.data])

    return (
        <div>
            <p>3 Zipped Dev Plugin Count: {currentCountPluginState?.data?.count}</p>
            <button onClick={incrementCount}>Increment Plugin Count</button>
        </div>
    );
};