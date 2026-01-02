import toast from "react-hot-toast"
import { cartEndpoints } from "../apis"

export const getCartitems = async (token) => {
  const toastId = toast.loading("Loading...")
  let result = null
  try {
    const response = await apiConnector(
      "GET",
      cartEndpoints.GET_CART_ITEMS,
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("CART ITEMS............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data
    console.log("result is: ",result);
  } catch (error) {
    console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
    result = error.response.data
  }
  toast.dismiss(toastId)
  return result
}