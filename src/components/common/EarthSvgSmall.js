import React from 'react'
import Svg, { Ellipse, Path } from 'react-native-svg'

const EarthSvgSmall = props => (
  <Svg viewBox="0 0 58 58" width={20} height={20} {...props}>
    <Ellipse cx={29} cy={50} rx={29} ry={8} fill="#23a24d" />
    <Path
      d="M41.676 5.324c-7.098-7.098-18.607-7.098-25.706 0C9.574 11.72 8.855 23.763 14.282 31l14.541 21 14.541-21c5.428-7.237 4.708-19.28-1.688-25.676zM29 24a6 6 0 1 1 0-12 6 6 0 0 1 0 12z"
      fill="#ebba16"
    />
  </Svg>
)

export { EarthSvgSmall }
