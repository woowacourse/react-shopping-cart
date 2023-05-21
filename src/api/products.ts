export async function getProductsData() {
  const resposne = await fetch("/products");
  if (!resposne.ok) {
    throw Error(resposne.status.toString());
  }
  const data = await resposne.json();
  return data;
}
