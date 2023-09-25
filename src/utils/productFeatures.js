import axios from "axios";
import { addProductsCarts, getAllProduct } from "./apiEcommerce";
const randomSort = () => {
    return Math.random() - 0.5
}
export const getProduct = async () => {
    try {
        console.log('la');
        const { data } = await axios.get(getAllProduct)
        return data.data.slice(0, 10).sort(randomSort)
    } catch (error) {
        console.log(error);
    }
}

export const addProductCart = async (idProduct, token) => {
    console.log(token);
    try {
        await axios.post(`${addProductsCarts}/${idProduct}`, {
            headers: {
                'Authorization': `${token}`
            }
        })
        console.log('ici');
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}