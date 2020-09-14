import { addNovelWord, subtractNovelWord } from "@/store/actions/novel"

import myImage from "@/assets/images/yue.jpg"
import "./home.scss"
import { useState } from "react"

import Modal from '@/components/Modal'

const ModalContent = () => {
  return (
    <div style={{height:'400px',width:'300px', background:'white'}}>
      弹框内容
    </div>
  )
}

const Home: React.FC<HomeProps> = (props) => {
  const { addWordsNumber, substructWordsNumber } = props
  const [isShow, setIsShow] = useState<boolean>(false)
  
  const handleAddWordsNumber = (): void => {
    addWordsNumber(1)
  }
  const handleSubstructWordsNumber = (): void => {
    substructWordsNumber(2)
  }
  const showDialog = (): void => {
    setIsShow(true)
  }
  const hideDialog = (): void => {
    setIsShow(false)
  }

  return (
    <div className="home">
      <h1>使用Webpack等搭建一个适用于React项目的脚手架</h1>
      <div onClick={handleAddWordsNumber} className="common-button">
        增加1个字
      </div>
      <div onClick={handleSubstructWordsNumber} className="common-button">
        减少2个字
      </div>
      <div onClick={showDialog} className="common-button">
        弹框显示
      </div>
      <img src={myImage} />

      {isShow && <Modal onClose = {hideDialog}><ModalContent /></Modal>}
    </div>
  )
}

const mapDispatchToProps = (dispatch: Function): object => ({
  addWordsNumber: (number): void => dispatch(addNovelWord(number)),
  substructWordsNumber: (number): void => dispatch(subtractNovelWord(number)),
})

export default ReduxConnect(null, mapDispatchToProps)(Home)

interface HomeProps {
  addWordsNumber: Function
  substructWordsNumber: Function
}
