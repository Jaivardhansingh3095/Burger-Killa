import { BiCaretUpSquare, BiCheckboxSquare } from 'react-icons/bi';

function VegLogoSelector({ item, height = 5, width = 5 }) {
  return (
    <>
      {item.foodType === 'veg' ? (
        <BiCheckboxSquare className={`w-${width} h-${height} fill-green-600`} />
      ) : (
        <BiCaretUpSquare
          className={`h-${height} w-${width} p-[2px] fill-red-600`}
        />
      )}
    </>
  );
}

export default VegLogoSelector;
