import LoaderDasher from '../../../../components/LoaderDasher';
import { useCategories } from './useCategories';
import AddCategory from './AddCategory';
import DisplayCategories from './DisplayCategories';
import { useMenu } from './useMenu';

function MenuEdit() {
  const { categories, categoriesStatus } = useCategories();
  const { menu, menuStatus } = useMenu();

  if (categoriesStatus === 'pending' || menuStatus === 'pending') {
    return <LoaderDasher />;
  }

  const menuByCategory = {};
  categories.forEach((category) => {
    menuByCategory[category] = menu.filter(
      (product) => product.categories === category,
    );
  });

  return (
    <div className="flex flex-col items-center justify-start w-full h-full">
      <AddCategory categories={categories} />
      <div className="w-full py-10 grow-1">
        <DisplayCategories
          categories={categories}
          menuByCategory={menuByCategory}
        />
      </div>
    </div>
  );
}

export default MenuEdit;
