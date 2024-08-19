function FormInput({
  onChange,
  value,
  label,
  id,
  error,
  type = "text",
  disabled,
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={id} className="flex-1">
            {label}
          </label>
        )}
        <input
          className="input-style flex-[2]"
          type={type}
          name={id}
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
      {error && <p className="text-red-600 text-sm flex-1">{error}</p>}
    </div>
  );
}

export default FormInput;
