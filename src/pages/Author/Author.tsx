const Author: React.FC = () => {
  const authorsArr = ['一号作者', '二号作者'];
  return (
    <ul>
      {authorsArr.map((item, index) => {
        return <li key={index}>{item}</li>;
      })}
    </ul>
  );
}

export default Author