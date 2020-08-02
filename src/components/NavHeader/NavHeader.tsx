import routes from '@/router/index';

import { activeNavChange } from '@/redux/actions/activeNav';

import IState from '../../redux/types/state'

import './NavHeader.scss';

import {
  Link
} from "react-router-dom";

function NavHeader(props): JSX.Element {
  const { activeIndex, activeNavChange } = props;
  console.log(activeIndex)

  return (
    <div className="nav-header">
      <Link to="/"  onClick={()=>activeNavChange(0)} className={"nav-item" + ' ' + (activeIndex == 0 ? 'active' : '')} >首页</Link>
      <Link to="/novels" onClick={()=>activeNavChange(1)} className={"nav-item" + ' '  + (activeIndex == 1 ? 'active' : '')}>小说</Link>
      <Link to="/authors" onClick={()=>activeNavChange(2)} className={"nav-item" + ' '  + (activeIndex == 2 ? 'active' : '')}>作者</Link>
    </div>
  );
}
const mapStateToProps = (state: IState): StateProps => {
  const { activeNav: {activeIndex} } = state;
  return { activeIndex };
}
const mapDispatchToProps = (dispatch: Function ): object => ({
  activeNavChange: (number): void => dispatch(activeNavChange(number))
})

export default ReduxConnect(
  mapStateToProps,
  mapDispatchToProps,
)(NavHeader);


interface StateProps  {
  activeIndex: number;
}