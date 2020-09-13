import { combineReducers } from "redux"
import novel from "./novel"
import user from "./user"
import activeNav from "./activeNav"

export default combineReducers({ novel, user, activeNav })
