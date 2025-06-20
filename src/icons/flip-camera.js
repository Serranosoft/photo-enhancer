import * as React from "react"
import Svg, { Path } from "react-native-svg"

function FlipCameraIcon() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={32}
      height={32}
      strokeWidth={2}
    >
      <Path d="M4 12V9a3 3 0 013-3h13m-3-3l3 3-3 3M20 12v3a3 3 0 01-3 3H4m3 3l-3-3 3-3" />
    </Svg>
  )
}

export default FlipCameraIcon
