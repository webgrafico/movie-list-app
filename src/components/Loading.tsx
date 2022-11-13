interface ILoading {
  isVisible: boolean;
}

const Loading: React.FC<ILoading> = ({ isVisible = false }: ILoading) =>
  isVisible ? (
    <div>
      <h2>Loading...</h2>
    </div>
  ) : null;

export default Loading;
