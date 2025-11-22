import { useState } from 'react';
import { ImCancelCircle } from 'react-icons/im';

import RadioGroup from '../../../../components/RadioGroup';
import { camelCaseName, FOODTYPE } from '../../../../utils/helpers';
import { useUpdateProduct } from './useUpdateProduct';

function EditProductModal({ handleEditModal, product, categories }) {
  const [imageUpload, setImageUpload] = useState({
    file: null,
  });
  const [foodType, setFoodType] = useState(product.foodType);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [discount, setDiscount] = useState(product.discount);
  const [selectCategory, setSelectCategory] = useState(product.categories);
  const [error, setError] = useState(() => {
    return {
      name: false,
      description: false,
      price: false,
      discount: false,
    };
  });
  const { updateProduct, updateStatus } = useUpdateProduct();

  //handling image upload update
  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImageUpload((prev) => ({ ...prev, file }));

    const output = document.getElementById('upload-image');
    output.src = URL.createObjectURL(file);
    output.onload = function () {
      URL.revokeObjectURL(output.src);
    };

    //Priting file name for user
    const filename =
      file.name.length > 25
        ? file.name.slice(0, 20) + '....' + file.name.slice(-7)
        : file.name;
    document.getElementById('file-name').textContent = filename || '';
  }

  function handleFoodType(value) {
    setFoodType(value);
  }

  //Handling form data
  function handleSubmit(e) {
    e.preventDefault();

    //Handling form error
    let errorFound = false;
    const errorObj = {
      name: false,
      description: false,
      price: false,
      discount: false,
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

    if (errorFound) {
      setError((prev) => {
        const newObj = { ...prev };
        Object.keys(errorObj).forEach((key) => (newObj[key] = errorObj[key]));

        return { ...newObj };
      });
      return;
    }

    //handling the form changes
    //Checking for form fields which has been updated
    const userChanges = {
      name: false,
      description: false,
      price: false,
      discount: false,
      foodType: false,
      categories: false,
      image: false,
    };
    let anyChanges = false;

    if (name.trim().toLowerCase() !== product.name.toLowerCase()) {
      userChanges.name = true;
      anyChanges = true;
    }
    if (
      description.trim().toLowerCase() !== product.description.toLowerCase()
    ) {
      userChanges.description = true;
      anyChanges = true;
    }
    if (+price !== product.price) {
      userChanges.price = true;
      anyChanges = true;
    }
    if (+discount !== product.discount) {
      userChanges.discount = true;
      anyChanges = true;
    }
    if (foodType !== product.foodType) {
      userChanges.foodType = true;
      anyChanges = true;
    }
    if (selectCategory !== product.categories) {
      userChanges.categories = true;
      anyChanges = true;
    }
    if (imageUpload.file) {
      userChanges.image = true;
      anyChanges = true;
    }

    //If there aren't any changes ignore the update
    if (!anyChanges) return handleEditModal();

    const formdata = new FormData();
    formdata.append('name', name);
    Object.keys(userChanges).forEach((key) => {
      if (userChanges[key]) {
        if (key === 'decription') formdata.append(key, description);
        if (key === 'price') formdata.append(key, parseInt(price));
        if (key === 'discount') formdata.append(key, parseInt(discount));
        if (key === 'foodType') formdata.append(key, foodType);
        if (key === 'categories') formdata.append(key, selectCategory);
        if (key === 'image') formdata.append('productImage', imageUpload.file);
      }
    });

    //Update the product
    updateProduct({ payload: formdata, productId: product._id });

    handleEditModal();
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[70%] h-[85%] bg-white rounded-lg relative"
      >
        <div
          className="absolute top-0 cursor-pointer -right-6 sm:-right-12"
          onClick={handleEditModal}
        >
          <ImCancelCircle className="w-5 h-5 sm:h-7 sm:w-7 fill-gray-50" />
        </div>
        <div className="w-full h-full p-3">
          <div className="flex items-center justify-center w-full h-full">
            <div className="flex flex-col items-center justify-start h-full gap-10 pt-5 flex-2/5">
              <img
                // src={imageUpload ? imageUpload : product.imgUrl}
                src={product.imgUrl}
                alt={product.productImage}
                id="upload-image"
                className="rounded-lg w-100 h-100 drop-shadow-[2px_5px_10px] drop-shadow-gray-800"
              />
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
                    disabled={updateStatus === 'pending'}
                  />
                </div>
                <span
                  id="file-name"
                  className="w-full text-sm text-center text-gray-600"
                ></span>
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
                        disabled={updateStatus === 'pending'}
                      />
                      {error.name ? (
                        <span className="w-full text-xs text-gray-600 bg-rose-200">
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
                        disabled={updateStatus === 'pending'}
                      />
                      {error.description ? (
                        <span className="w-full text-xs text-gray-600 bg-rose-200">
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
                        disabled={updateStatus === 'pending'}
                      />
                      {error.price ? (
                        <span className="w-full text-xs text-gray-600 bg-rose-200">
                          Price can only be whole number.
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
                        disabled={updateStatus === 'pending'}
                      />
                      {error.discount ? (
                        <span className="w-full text-xs text-gray-600 bg-rose-200">
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
                            defaultChecked={product.foodType}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-start w-full gap-7">
                    <label
                      htmlFor="categories"
                      className="text-lg font-semibold text-gray-600"
                    >
                      Categories:
                    </label>
                    <select
                      id="categories"
                      name="category"
                      value={selectCategory}
                      onChange={(e) => setSelectCategory(e.target.value)}
                      className="px-2 border-2 border-gray-400 outline-none"
                      disabled={updateStatus === 'pending'}
                    >
                      {categories.map((category) => (
                        <option value={category}>
                          {camelCaseName(category)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-center w-full">
                  <button
                    disabled={updateStatus === 'pending'}
                    className="w-[65%] py-6 text-xl font-bold tracking-wider text-white transition-all duration-300 ease-linear rounded-lg cursor-pointer hover:bg-primary/85 hover:dark:bg-primary-dark/85 bg-primary dark:bg-primary-dark inset-shadow-[2px_-3px_5px] inset-shadow-amber-700 dark:inset-shadow-blue-900 active:scale-98 active:-translate-x-1 active:inset-shadow-[1px_-1px_2px]"
                  >
                    {updateStatus === 'pending' ? 'Wait...' : 'Update'}
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

export default EditProductModal;
