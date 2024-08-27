import { useSearchParams } from "react-router-dom";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e) {
    console.log(e.target.value);
    
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <select
      className="bg-gray-300 text-gray-600 text-lg py-1 px-2 rounded"
      onChange={handleChange}
      value={sortBy}
      name="sortBy"
      id="sortBy"
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SortBy;
