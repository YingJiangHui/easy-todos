export const priorityColorMap = {
  "low": "green",
  "medium": "blue",
  "high": "yellow",
  "highest": "red"
}

export const priorityTextMap = {
  "low": "❗   ",
  "medium": "❗❗  ",
  "high": "❗❗❗ ",
  "highest": "❗❗❗❗"
}

export type PriorityColorMap = typeof priorityColorMap
export type PriorityTextMap = typeof priorityTextMap
export type PriorityKey = keyof typeof priorityTextMap
