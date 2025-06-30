/**
 * Retorna una lista de productos desde una API.
 */
export const getProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error(
        "La solicitud a la API falló con el estado: " + response.status
      );
    }
    const products = await response.json();
    return products;
  } catch (error) {
    console.error("Hay una problema en la respuesta a la solicitud GET", error);
  }
};