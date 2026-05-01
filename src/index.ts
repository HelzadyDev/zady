import * as functions from "#functions"
import { bgColors, colors, terminalStyle } from "#core"

const logger = {
  ...functions,
  
  style: {
    bgColors,
    colors,
    terminalStyle
  }
}

export default logger

