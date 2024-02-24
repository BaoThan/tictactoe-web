function Square({ className, value, onClick }) {
  return (
    <div onClick={onClick} className={`square ${className}`}>
      {value}
    </div>
  );
}

export default Square;
