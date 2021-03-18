const priorityColorMap = {
  "low": "cyan",
  "medium": "blue",
  "high": "yellow"
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