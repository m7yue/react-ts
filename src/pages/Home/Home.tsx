import { addNovelWord, subtractNovelWord } from '@/redux/actions/novel';

import myImage from '@/assets/images/yue.jpg';
import './home.scss';

const Home: React.FC<HomeProps> = props => {
  const { addWordsNumber, substructWordsNumber } = props;
  const handleAddWordsNumber = (): void => {
    addWordsNumber(1);
  };
  const handleSubstructWordsNumber = (): void => {
    substructWordsNumber(2);
  };
  return (
    <div>
      <h1>使用Webpack等搭建一个适用于React项目的脚手架</h1>
      <div onClick={handleAddWordsNumber} className="common-button">增加1个字</div>
      <div onClick={handleSubstructWordsNumber} className="common-button">减少2个字</div>
      <img src={myImage} />
    </div>
  );
}

const mapDispatchToProps = (dispatch: Function ): object => ({
  addWordsNumber: (number): void => dispatch(addNovelWord(number)),
  substructWordsNumber: (number): void => dispatch(subtractNovelWord(number)),
})

export default ReduxConnect(
  null,
  mapDispatchToProps,
)(Home);

interface HomeProps {
  addWordsNumber: Function;
  substructWordsNumber: Function;
}
