import ActiveNavState from "../types/activeNav"

const initialState = {
  activeIndex: 0,
}
export default function changeActiveIndex(
  state = initialState,
  action
): ActiveNavState {
  console.log(action, '0008888')
  let { activeIndex } = state
  const { type, payload } = action
  switch (type) {
    case "CHANGE_ACTIVE_INDEX":
      activeIndex = payload
      break
  }
  return {
    ...state,
    activeIndex,
  }
}
