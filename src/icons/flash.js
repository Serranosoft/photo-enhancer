import * as React from "react"
import Svg, { Path } from "react-native-svg"

function FlashIcon({ activated }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={activated ? "#ffea00" : "#fff"}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={32}
      height={32}
      strokeWidth={2}
    >
      <Path d="M13 3v7h6l-8 11v-7H5l8-11" />
    </Svg>
  )
}

export default FlashIcon
