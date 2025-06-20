import * as React from "react"
import Svg, { Path } from "react-native-svg"

function GalleryIcon() {
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
      <Path d="M15 8h.01M11.5 21H6a3 3 0 01-3-3V6a3 3 0 013-3h12a3 3 0 013 3v5.5" />
      <Path d="M15 18a3 3 0 106 0 3 3 0 10-6 0M20.2 20.2L22 22M3 16l5-5c.928-.893 2.072-.893 3 0l2 2" />
    </Svg>
  )
}

export default GalleryIcon
