function Cell({ value, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={Boolean(value)}
      className={`aspect-square w-full rounded-xl border text-4xl font-bold transition sm:text-5xl ${
        value === "X"
          ? "border-blue-500/30 bg-blue-500/10 text-blue-400"
          : value === "O"
          ? "border-pink-500/30 bg-pink-500/10 text-pink-400"
          : "border-gray-800 bg-gray-900 hover:border-gray-700 hover:bg-gray-800"
      }`}
    >
      {value}
    </button>
  );
}

export default Cell;