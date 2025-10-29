import ItemList from './ItemList';
import MenuCategories from './MenuCategories';

function MenuLayout() {
  return (
    <div className="flex items-center justify-center h-full gap-2 mb-16 overflow-y-auto md:mb-18 flex-3/5 xl:flex-3/4 lg:mb-0">
      <MenuCategories />
      <ItemList />
    </div>
  );
}

export default MenuLayout;
