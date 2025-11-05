
import { useSelector } from "react-redux"
import { getOrders } from "../../features/orderSlice"
import { useEffect } from "react"
const Order = () => {
    useEffect(() => {
        dispatch(getOrders())
    }, [dispatch])

    const orders = useSelector(state => state.order.orders)

    return (
        <div>
            <h1>Order</h1>
            {
                orders && orders.map((order) => {
                    return (
                        <div key={order._id}>



                        </div>
                    )
                }
            )
}


        </div>
    )
}
export default Order;