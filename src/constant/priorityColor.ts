const priorityColorMap = {
  "low": "cyan",
  "medium": "blue",
  "high": "magenta"
}

export type PriorityColorMap = typeof priorityColorMap

const priorityTextMap = {
  "low": "❗  ",
  "medium": "❗❗ ",
  "high": "❗❗❗"
}

export type PriorityTextMap = typeof priorityTextMap

module.exports ={
  priorityColorMap,
  priorityTextMap
}