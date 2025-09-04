import ItemList from './ItemList';
import MenuCategories from './MenuCategories';

function MenuLayout() {
  return (
    <div className="flex-3/4 font-[700] flex justify-center items-center gap-2 h-full">
      <MenuCategories />
      <ItemList />
    </div>
  );
}

export default MenuLayout;
