import { useState } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import { FaImage } from 'react-icons/fa6';

import { FOODTYPE } from '../../../../utils/helpers';
import RadioGroup from '../../../../components/RadioGroup';
import { useAddProduct } from './useAddProduct';

function AddProductModal({ handleAddModal, category }) {
  const [imageUpload, setImageUpload] = useState({
    file: null,
  });
  const [foodType, setFoodType] = useState('veg');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [error, setError] = useState(() => {
    return {
      name: false,
      description: false,
      price: false,
      discount: false,
      image: false,
    };
  });

  const { addProduct, addingStatus } = useAddProduct();

  function handleFoodType(value) {
    setFoodType(value);
  }

  //handling image upload update
  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImageUpload((prev) => ({ ...prev, file }));

    const output = document.getElementById('upload-image');
    if (output) {
      output.src = URL.createObjectURL(file);
      output.onload = function () {
        URL.revokeObjectURL(output.src);
      };
    }

    //Priting file name for user
    const filename =
      file.name.length > 25
        ? file.name.slice(0, 20) + '....' + file.name.slice(-7)
        : file.name;
    document.getElementById('file-name').textContent = filename || '';
  }

  function handleSubmit(e) {
    e.preventDefault();

    //Handling form error
    let errorFound = false;
    const errorObj = {
      name: false,
      description: false,
      price: false,
      discount: false,
      image: false,
    };
    //checking error in each field
    if (!name || name.length <= 5) {
      errorObj.name = true;
      errorFound = true;
    }
    if (!description || description.length < 20) {
      errorObj.description = true;
      errorFound = true;
    }
    if (!price || +price <= 0 || Number.isNaN(parseInt(price))) {
      errorObj.price = true;
      errorFound = true;
    }
    if (+discount >= 55 || +discount < 0 || Number.isNaN(parseInt(discount))) {
      errorObj.discount = true;
      errorFound = true;
    }
    if (!imageUpload.file) {
      errorObj.image = true;
      errorFound = true;
    }

    if (errorFound) {
      setError((prev) => {
        const newObj = { ...prev };
        Object.keys(errorObj).forEach((key) => (newObj[key] = errorObj[key]));

        return { ...newObj };
      });
      return;
    }

    const formdata = new FormData();
    formdata.append('name', name);
    formdata.append('description', description);
    formdata.append('price', price);
    formdata.append('discount', discount);
    formdata.append('categories', category);
    formdata.append('foodType', foodType);
    formdata.append('productImage', imageUpload.file);

    addProduct({ payload: formdata });
    handleAddModal();
  }

  function handleReset(e) {
    e.preventDefault();
    setName('');
    setDescription('');
    setPrice('');
    setDiscount('');
    setImageUpload((prev) => ({ ...prev, file: null }));
    setFoodType('veg');
    setError((prev) => ({
      ...prev,
      name: false,
      description: false,
      price: false,
      discount: false,
    }));
    document.getElementById('file-name').textContent = '';
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[70%] h-[85%] bg-white rounded-lg relative"
      >
        <div
          className="absolute top-0 cursor-pointer -right-6 sm:-right-12"
          onClick={handleAddModal}
        >
          <ImCancelCircle className="w-5 h-5 sm:h-7 sm:w-7 fill-gray-50" />
        </div>
        <div className="w-full h-full p-3">
          <div className="flex items-center justify-center w-full h-full">
            <div className="flex flex-col items-center justify-start h-full gap-10 pt-5 flex-2/5">
              {imageUpload.file && (
                <img
                  // src={imageUpload ? imageUpload : product.imgUrl}
                  //src="http://localhost:3000/public/img/products/aloo-tikki-burger.png"
                  src={URL.createObjectURL(imageUpload.file)}
                  alt="product image"
                  id="upload-image"
                  className="rounded-lg w-100 h-100 drop-shadow-[2px_5px_10px] drop-shadow-gray-800"
                />
              )}
              {!imageUpload.file && (
                <div className="flex flex-col items-center justify-center gap-5 border-2 border-gray-300 border-dashed rounded-lg w-90 h-90">
                  <FaImage className="w-full h-full fill-gray-500 flex-4/5" />
                  <span className="text-lg font-semibold text-gray-500 flex-1/5">
                    Upload your image
                  </span>
                </div>
              )}
              <div className="flex flex-col items-center justify-center gap-3 ">
                <div className="flex items-center justify-center">
                  <label
                    htmlFor="file-upload"
                    className="px-5 py-2 text-white transition bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700"
                  >
                    Upload File
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    disabled={addingStatus === 'pending'}
                  />
                </div>
                <span
                  id="file-name"
                  className="w-full text-sm text-center text-gray-600"
                ></span>
                {error.image ? (
                  <span className="w-full p-1 text-xs text-gray-600 bg-rose-200 ">
                    Product image is required.
                  </span>
                ) : (
                  <span className="w-full py-2 bg-white"></span>
                )}
              </div>
            </div>
            <div className="w-full h-full pt-3 px-15 flex-3/5">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center justify-between w-full h-full gap-5"
              >
                <div className="flex flex-col items-center justify-start w-full h-full gap-5">
                  <div className="flex items-start justify-between w-full gap-5">
                    <label
                      htmlFor="name"
                      className="text-lg font-semibold text-gray-600 flex-1/5"
                    >
                      Name:
                    </label>
                    <div className="flex flex-col items-center justify-center gap-1 flex-4/5">
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 font-semibold tracking-wide text-gray-500 bg-gray-200 rounded-lg outline-none flex-4/5 grow-1"
                        disabled={addingStatus === 'pending'}
                      />
                      {error.name ? (
                        <span className="w-full pl-2 text-xs text-gray-600 bg-rose-200">
                          Name should be unique and have more than 5 characters.
                        </span>
                      ) : (
                        <span className="w-full py-2 bg-white"></span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start justify-between w-full gap-5">
                    <label
                      htmlFor="description"
                      className="text-lg font-semibold text-gray-600 flex-1/5"
                    >
                      Description:
                    </label>
                    <div className="flex flex-col items-center justify-center gap-1 flex-4/5">
                      <textarea
                        id="description"
                        rows="4"
                        cols="20"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 font-semibold tracking-wide text-gray-500 bg-gray-200 rounded-lg outline-none flex-4/5 grow-1"
                        disabled={addingStatus === 'pending'}
                      />
                      {error.description ? (
                        <span className="w-full pl-2 text-xs text-gray-600 bg-rose-200">
                          Description should be described in more than 20
                          characters.
                        </span>
                      ) : (
                        <span className="w-full py-2 bg-white"></span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start justify-between w-full gap-5">
                    <label
                      htmlFor="price"
                      className="text-lg font-semibold text-gray-600 flex-1/5"
                    >
                      Price:
                    </label>
                    <div className="flex flex-col items-center justify-center gap-1 flex-4/5">
                      <input
                        type="text"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full px-3 py-2 font-semibold tracking-wide text-gray-500 bg-gray-200 rounded-lg outline-none flex-4/5 grow-1"
                        disabled={addingStatus === 'pending'}
                      />
                      {error.price ? (
                        <span className="w-full pl-2 text-xs text-gray-600 bg-rose-200">
                          Price should be whole number.
                        </span>
                      ) : (
                        <span className="w-full py-2 bg-white"></span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start justify-between w-full gap-5">
                    <label
                      htmlFor="discount"
                      className="text-lg font-semibold text-gray-600 flex-1/5"
                    >
                      Discount<span className="text-sm">(%)</span>:
                    </label>
                    <div className="flex flex-col items-center justify-center gap-1 flex-4/5">
                      <input
                        type="text"
                        id="discount"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        className="w-full px-3 py-2 font-semibold tracking-wide text-gray-500 bg-gray-200 rounded-lg outline-none flex-4/5 grow-1"
                        disabled={addingStatus === 'pending'}
                      />
                      {error.discount ? (
                        <span className="w-full pl-2 text-xs text-gray-600 bg-rose-200">
                          Discount should be less than 55% and whole number.
                        </span>
                      ) : (
                        <span className="w-full py-2 bg-white"></span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full gap-5">
                    <label
                      htmlFor="foodType"
                      className="text-lg font-semibold text-gray-600 flex-1/5"
                    >
                      Food Type:
                    </label>
                    <div
                      id="foodType"
                      className="flex items-center justify-start w-full gap-6 flex-4/5"
                    >
                      {FOODTYPE.map((item) => (
                        <div key={item.label}>
                          <RadioGroup
                            item={item}
                            name="foodType"
                            value={foodType}
                            handleChange={handleFoodType}
                            defaultChecked={'veg'}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-start w-full gap-7">
                    <span className="text-lg font-semibold text-gray-600 flex-1/5">
                      Category:
                    </span>
                    <span className="text-lg font-semibold text-gray-600 uppercase flex-4/5">
                      {category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full gap-5">
                  <button
                    disabled={addingStatus === 'pending'}
                    className="w-[55%] py-6 text-xl font-bold tracking-wider text-white transition-all duration-300 ease-linear rounded-lg cursor-pointer hover:bg-primary/85 hover:dark:bg-primary-dark/85 bg-primary dark:bg-primary-dark inset-shadow-[2px_-3px_5px] inset-shadow-amber-700 dark:inset-shadow-blue-900 active:scale-98 active:-translate-x-1 active:inset-shadow-[1px_-1px_2px] shadow-[1px_3px_5px_2px] shadow-gray-400 active:shadow-none"
                  >
                    {addingStatus === 'pending' ? 'Wait...' : 'Add Item'}
                  </button>
                  <button
                    onClick={handleReset}
                    disabled={addingStatus === 'pending'}
                    className="shadow-[1px_3px_5px_2px] shadow-gray-400 active:shadow-none w-[35%] py-6 text-xl font-bold tracking-wider text-white transition-all duration-300 ease-linear rounded-lg cursor-pointer hover:bg-green-500/85  bg-green-500  inset-shadow-[2px_-3px_5px] inset-shadow-green-800  active:scale-98 active:-translate-x-1 active:inset-shadow-[1px_-1px_2px]"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProductModal;
