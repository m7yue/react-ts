import { fetchUserInfo } from '@/redux/actions/user';

import IState from '../../redux/types/state'

const Counter: React.FC<CounterProps> = props => {
  const { userName, wordsNumber, fetchUserInfo } = props;
  UseEffect(() => {
    fetchUserInfo();
  }, []);
  return (
    <div>
      <p>
        {userName}
        <span style={{ display: 'inline-block', paddingLeft: '20px' }}>字数统计：{wordsNumber}</span>
      </p>
    </div>
  );
}

const mapStateToProps = (state: IState): StateProps => {
  const { novel, user } = state;
  const { wordsNumber } = novel;
  const { userInfo: { userName } } = user;
  return { wordsNumber, userName };
}
const mapDispatchToProps = (dispatch: Function): object => ({
  fetchUserInfo: (): void => dispatch(fetchUserInfo())
});

export default ReduxConnect(
  mapStateToProps,
  mapDispatchToProps,
)(Counter);


interface CounterProps {
  userName: string;
  wordsNumber: number;
  fetchUserInfo?: Function;
}

interface StateProps  {
  userName: string;
  wordsNumber: number;
}