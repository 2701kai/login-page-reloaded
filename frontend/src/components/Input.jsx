export function Input({ type, placeholder, value, onChangeHandler, required }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChangeHandler}
      className="p-2 m-2 w-full border border-white bg-black text-white rounded"
      required={required}
    />
  );
}
