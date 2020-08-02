import { ADD_NOVEL_WORD, SUBTRACT_NOVEL_WORD } from '@/redux/actionTypes/novel';
import NovelState from '../types/novel'

const initialState: NovelState = {
  wordsNumber: 0
};

interface Action {
  type: string;
  payload: number;
}

export default function changeWordsNumber (state = initialState, action: Action): NovelState {
  console.log(action, 'novel')
  let { wordsNumber } = state;  
  const { type, payload } = action;
  switch (true) {
    case type === ADD_NOVEL_WORD:
      wordsNumber += payload;
      break;
    case type === SUBTRACT_NOVEL_WORD:
      wordsNumber = wordsNumber - payload > 0 ? wordsNumber - payload : 0;
      break;
  }
  return {
    ...state,
    wordsNumber
  };
}