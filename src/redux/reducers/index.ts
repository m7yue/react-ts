import { combineReducers } from 'redux';
import novel from './novel';
import user from './user';
import activeNav from './activeNav';

import IState from '../types/state'

export default combineReducers({ novel, user, activeNav });