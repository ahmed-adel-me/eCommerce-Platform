import { useSearchParams } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Parse the current filter values from the URL
  const filterParam = searchParams.get("filter") || "";
  const filters = new URLSearchParams(filterParam);
  const currentFilter = filters.get(filterField) || "";

  function handleChange(e) {
    const { value } = e.target;

    // Create a new URLSearchParams object to manage multiple filters
    const updatedFilters = new URLSearchParams(filterParam);

    if (value === "") {
      // Remove the filter field if the value is empty
      updatedFilters.delete(filterField);
    } else {
      // Update or add the filter field with the new value
      updatedFilters.set(filterField, value);
    }

    // Convert URLSearchParams back to a string
    const newFilterParam = updatedFilters.toString();
    
    // Update the search parameters in the URL
    if (newFilterParam) {
      searchParams.set("filter", newFilterParam);
    } else {
      searchParams.delete("filter");
    }

    setSearchParams(searchParams);
  }

  return (
    <select
      className="bg-gray-300 text-gray-600 text-lg py-1 px-2 rounded"
      value={currentFilter}
      onChange={handleChange}
    >
      <option value="">{filterField}</option>
      {options?.length > 0 &&
        options.map((op, index) => (
          <option key={index} value={op}>
            {op}
          </option>
        ))}
    </select>
  );
}

export default Filter;
