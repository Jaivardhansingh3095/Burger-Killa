import { useRef, useState } from 'react';
import { camelCaseName, formatCurrency } from '../../../../utils/helpers';

import { RiDeleteBin5Fill } from 'react-icons/ri';
import { RiEditFill } from 'react-icons/ri';
import { PiPlusBold } from 'react-icons/pi';
import VegLogoSelector from '../../../../components/VegLogoSelector';
import useOutsideClick from '../../../../hook/useOutsideCllick';
import Modal from '../../../../components/Modal';
import EditProductModal from './EditProductModal';
import DeleteProductModal from './DeleteProductModal';
import AddProductModal from './AddProductModal';

function DisplayCategories({ categories, menuByCategory }) {
  const [accordion, setAccordion] = useState(() => {
    const newObj = {};
    categories.forEach((category) => {
      newObj[category] = false;
    });

    return newObj;
  });

  const [selectProduct, setSelectProduct] = useState({});
  const categoryRef = useRef();

  const { openModal: openEdit, handleModalClose: handleEditModal } =
    useOutsideClick();

  const { openModal: openDelete, handleModalClose: handleDeleteModal } =
    useOutsideClick();

  const { openModal: openAdd, handleModalClose: handleAddModal } =
    useOutsideClick();

  return (
    <>
      <ul className="flex flex-col items-center w-full h-full gap-10 px-20 justify-evenly">
        {categories.map((category) => (
          <li
            key={category + Math.floor(Math.random() * 100 + 1)}
            onClick={() => {
              setAccordion((prev) => {
                return { ...prev, [category]: !prev[category] };
              });
            }}
            className="w-full bg-white flex flex-col  justify-center items-center gap-5  rounded-lg shadow-[1px_3px_5px_2px] shadow-gray-300 "
          >
            <div className={` w-full px-10`}>
              <div
                className={`flex items-center py-5 justify-between w-full font-bold tracking-wide text-text-secondary ${accordion[category] ? ' border-b-2 border-b-gray-300' : ''}`}
              >
                <span className="text-2xl">
                  {camelCaseName(category + 's')}
                </span>
                <span
                  className={`text-4xl ${accordion[category] ? 'rotate-45' : 'rotate-0'} transition-transform duration-200 ease-linear`}
                >
                  +
                </span>
              </div>
            </div>
            {accordion[category] && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col items-center justify-center w-full gap-5 px-5 pt-2 pb-5"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="flex items-center justify-center gap-5 text-lg">
                    <span>Total Items:</span>
                    <span className="font-semibold ">
                      {menuByCategory[category].length}
                    </span>
                  </span>
                  <button
                    onClick={() => {
                      categoryRef.current = category;
                      handleAddModal();
                    }}
                    className="flex items-center justify-center gap-2 px-6 py-2 text-lg font-bold text-white transition-colors duration-300 ease-linear rounded-lg cursor-pointer hover:bg-primary/85 hover:dark:bg-primary-dark/85 bg-primary dark:bg-primary-dark"
                  >
                    <PiPlusBold className="w-5 h-5" />
                    <span className="md:text-lg text-shadow-2xs text-shadow-amber-800">
                      Add Item
                    </span>
                  </button>
                </div>
                {!menuByCategory[category].length && (
                  <div className="flex items-center justify-center w-full py-10">
                    <span className="text-xl font-semibold">
                      Start with adding some products
                    </span>
                  </div>
                )}
                {menuByCategory[category].length ? (
                  <div className="w-full grid grid-cols-[repeat(2,1fr)] gap-5">
                    {menuByCategory[category].map((product) => (
                      <>
                        <div
                          key={product._id}
                          className="flex flex-col items-center justify-center gap-5 p-3 border rounded-lg border-amber-700 dark:border-blue-700"
                        >
                          <div className="flex items-center justify-between w-full gap-8">
                            <img
                              src={`${product.imgUrlSmall}`}
                              //key={`${product.imageUrlSmall}-${Date.now()}`}
                              alt={product.productImageSmall}
                              className="rounded-lg w-50 h-50 drop-shadow-[2px_5px_5px] drop-shadow-gray-500"
                            />
                            <div className="flex flex-col items-start justify-start w-full h-full gap-2">
                              <div className="flex items-start w-full gap-5">
                                <span className="text-xl font-bold text-shadow-2xs text-shadow-amber-800 flex-4/5 text-amber-500 dark:text-primary-dark">
                                  {product.name}
                                </span>
                                <span className="flex justify-end flex-1/5">
                                  <VegLogoSelector
                                    item={product}
                                    height={6}
                                    width={6}
                                  />
                                </span>
                              </div>
                              <span className="pl-1 text-2xl font-bold">
                                {formatCurrency(product.price)}
                              </span>
                              <span className="flex items-center justify-center gap-3 pl-1">
                                <span>Discount:</span>
                                <span
                                  className={` font-semibold text-lg ${product.discount > 0 ? 'text-red-500' : 'text-green-500'}`}
                                >
                                  {product.discount} %
                                </span>
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between w-full gap-5">
                            <button
                              onClick={() => {
                                setSelectProduct((prev) => ({
                                  ...prev,
                                  ...product,
                                }));
                                handleEditModal();
                              }}
                              className="flex items-center justify-center gap-2 px-20 py-3 text-lg font-semibold text-white transition-all duration-200 ease-linear rounded-lg cursor-pointer bg-primary dark:bg-primary-dark hover:bg-primary/85 hover:dark:bg-primary-dark/85 shadow-[1px_3px_5px_2px] shadow-gray-400 active:shadow-none active:scale-99 active:translate-y-0.5"
                            >
                              <RiEditFill />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => {
                                setSelectProduct((prev) => ({
                                  ...prev,
                                  ...product,
                                }));
                                handleDeleteModal();
                              }}
                              className="flex items-center justify-center gap-2 px-16 py-3 text-lg font-semibold text-white transition-all duration-200 ease-linear rounded-lg cursor-pointer bg-rose-500  hover:bg-rose-500/85  shadow-[1px_3px_5px_2px] shadow-gray-400 active:shadow-none active:scale-99 active:translate-y-0.5"
                            >
                              <RiDeleteBin5Fill />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                ) : null}
              </div>
            )}
          </li>
        ))}
      </ul>
      {openEdit && (
        <Modal open={openEdit} onModalClose={handleEditModal}>
          <EditProductModal
            handleEditModal={handleEditModal}
            product={selectProduct}
            categories={categories}
          />
        </Modal>
      )}
      {openDelete && (
        <Modal open={openDelete} onModalClose={handleDeleteModal}>
          <DeleteProductModal
            product={selectProduct}
            handleDeleteModal={handleDeleteModal}
          />
        </Modal>
      )}
      {openAdd && (
        <Modal open={openAdd} onModalClose={handleAddModal}>
          <AddProductModal
            category={categoryRef.current}
            handleAddModal={handleAddModal}
          />
        </Modal>
      )}
    </>
  );
}

export default DisplayCategories;
