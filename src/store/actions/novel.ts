import { ADD_NOVEL_WORD, SUBTRACT_NOVEL_WORD } from "../action-types/novel"

export const addNovelWord = (payload): object => ({
  type: ADD_NOVEL_WORD,
  payload,
})

export const subtractNovelWord = (payload): object => ({
  type: SUBTRACT_NOVEL_WORD,
  payload,
})
