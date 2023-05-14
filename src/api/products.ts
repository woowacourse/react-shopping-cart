export async function getProductsData() {
  try {
    const resposne = await fetch("products.json");
    if (!resposne) throw new Error("no data!");
    const data = await resposne.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}
