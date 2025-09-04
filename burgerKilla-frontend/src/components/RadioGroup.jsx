import { camelCaseName } from '../utils/helpers';

function RadioGroup({ item, name, value, handleChange, defaultChecked }) {
  return (
    <>
      <input
        type="radio"
        id={item.value}
        name={name}
        className="peer hidden"
        value={item.value}
        onChange={(e) => handleChange(e.target.value)}
        checked={value ? value === item.value : defaultChecked === item.value}
        required
      />
      <label
        htmlFor={item.value}
        className="relative flex justify-center items-center tracking-wide before:inline-block  before:h-5 before:w-5 before:rounded-full before:border-2 before:border-orange-400 before:mr-2 after:inline-block  after:h-3 after:w-3 after:bg-orange-400 after:rounded-full after:absolute after:left-[4px] after:opacity-0 peer-checked:after:opacity-100 after:transition-all after:duration-400 after:ease-out"
      >
        {camelCaseName(item.label)}
      </label>
    </>
  );
}

export default RadioGroup;
