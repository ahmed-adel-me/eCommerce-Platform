import InputError from "./InputError";

function FormInput({
  label,
  name,
  type = "text",
  error,
  onChange,
  onBlur,
  value,
  disabled,
  className = "",
  as = "input",
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-gray-600 font-semibold" htmlFor={name}>
          {label}
        </label>
      )}{" "}
      {as === "input" ? (
        <input
          className={`text-lg py-1 px-3 rounded border-2 ${
            error ? "border-red-500" : "border-gray-400"
          } outline-none text-gray-900 w-full bg-white mt-1 disabled:bg-gray-300 disabled:text-gray-500`}
          type={type}
          name={name}
          id={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          disabled={disabled}
        />
      ) : (
        <textarea
          className={`text-lg py-1 px-3 rounded border-2 ${
            error ? "border-red-500" : "border-gray-400"
          } outline-none text-gray-900 w-full bg-white mt-1 disabled:bg-gray-300 disabled:text-gray-500`}
          name={name}
          id={name}
          onChange={onChange}
          value={value}
          disabled={disabled}
        ></textarea>
      )}
      <InputError error={error} />
    </div>
  );
}

export default FormInput;
