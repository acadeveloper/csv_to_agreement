import cn from 'classnames';

export default function Button({ text, onClick, disabled, className }) {
  const btnMainClassnames = disabled
    ? 'bg-gray-300 text-gray-500 font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed'
    : 'bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded';

  const classnames = cn(btnMainClassnames, className);

  return (
    <button
      disabled={disabled}
      className={classnames}
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
