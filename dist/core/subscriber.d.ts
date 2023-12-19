import React from "react";
import reducer from "./reducer";
type State<Data = any, Error = any> = ReturnType<typeof reducer<Data, Error>>;
declare const subscriber: {
    getState: <Data, Error_1>(key: string) => import("./reducer").State<Data, Error_1>;
    subscribe: <Data_1, Error_2>(key: string, callback: (value: import("./reducer").State<Data_1, Error_2>) => void) => () => void;
    useState: <Data_2, Error_3>(key: string) => {
        state: import("./reducer").State<Data_2, Error_3>;
        dispatch: React.Dispatch<import("./reducer").Action>;
    };
    mutate: <Data_3, Error_4>(key: string, values: Partial<import("./reducer").State<Data_3, Error_4>>) => void;
};
export default subscriber;
