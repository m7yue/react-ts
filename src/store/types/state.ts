import NovelState from './novel'
import ActiveNavState from './activeNav'
import {UserState}  from './user'

interface IState {
  novel: NovelState,
  user: UserState,
  activeNav: ActiveNavState
}

export default IState