import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CameraIcon({ focused }) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke={focused ? "#fff" : "#c2c2c2"}
            strokeLinecap="round"
            strokeLinejoin="round"
            width={32}
            height={32}
            strokeWidth={2}
        >
            <Path d="M5 7h1a2 2 0 002-2 1 1 0 011-1h6a1 1 0 011 1 2 2 0 002 2h1a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2" />
            <Path d="M9 13a3 3 0 106 0 3 3 0 00-6 0" />
        </Svg>
    )
}

export default CameraIcon
