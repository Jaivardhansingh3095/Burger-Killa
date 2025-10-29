const BACKEND_ADDRESS = import.meta.env.VITE_BACKEND_LINK;

//@params - category - type of menu category
//return menu data with particular category
export async function getMenuByCategory(category) {
  try {
    const res = await fetch(`${BACKEND_ADDRESS}/menu?categories=${category}`);

    if (!res.ok) throw new Error('Check your connection!');

    const data = await res.json();

    const menu = data.data.newMenu;

    return menu;
  } catch (err) {
    console.error(err);
  }
}

//return data with addon items list
export async function getAddOnList() {
  try {
    const res = await fetch(`${BACKEND_ADDRESS}/menu/addon`);

    if (!res.ok) throw new Error('Check your connection!');

    const data = await res.json();

    return data?.data?.addOnList;
  } catch (err) {
    console.error(err);
  }
}

export const getTopProducts = async () => {
  try {
    const res = await fetch(`${BACKEND_ADDRESS}/menu/topSixProducts`);

    if (!res.ok) throw new Error('Check your connection!');

    const data = await res.json();

    const { products } = data.data;

    return products;
  } catch (err) {
    console.error(err);
  }
};
