export async function getProductsData() {
  const resposne = await fetch("products.json");
  if (!resposne.ok) {
    throw Error(resposne.status.toString());
  }
  const data = await resposne.json();
  return data;
}
