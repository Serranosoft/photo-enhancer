import * as React from "react"
import Svg, { Path } from "react-native-svg"

function FolderIcon({ focused }) {
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
            <Path d="M5 19l2.757-7.351A1 1 0 018.693 11H21a1 1 0 01.986 1.164l-.996 5.211A2 2 0 0119.026 19H5a2 2 0 01-2-2V6a2 2 0 012-2h4l3 3h7a2 2 0 012 2v2" />
        </Svg>
    )
}

export default FolderIcon
