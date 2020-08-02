import ActiveNavState from '../types/activeNav'

const initialState = {
  activeIndex: 0
};
export default function changeActiveIndex (state = initialState, action): ActiveNavState {
  let { activeIndex } = state;  
  const { type, payload } = action;
  switch (true) {
    case type === 'CHANGE_ACTIVE_INDEX':
      activeIndex = payload;
      break;
  }
  return {
    ...state,
    activeIndex,
  };
}
