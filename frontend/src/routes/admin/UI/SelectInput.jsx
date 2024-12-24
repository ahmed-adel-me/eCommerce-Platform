import PropTypes from "prop-types";
import InputError from "./InputError";

const SelectInput = ({
  id,
  name,
  label,
  options,
  value,
  onChange,
  error = "",
  disabled = false,
}) => {
  return (
    <div>
      <label className="text-gray-600 font-semibold" htmlFor={id}>
        {label}
      </label>
      <select
        className={`text-lg py-2 px-3 rounded border-2 ${
          error ? "border-red-500" : "border-gray-400"
        } outline-none text-gray-900 w-full bg-white mt-1 disabled:bg-gray-300 disabled:text-gray-500`}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <InputError error={error} />
    </div>
  );
};

SelectInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool,
};

export default SelectInput;
