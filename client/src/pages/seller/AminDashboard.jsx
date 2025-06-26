import React, { useEffect,useState } from "react";
import { useAppContext } from "../../context/AppContext";


const salesData = [
  { day: "Mon", sales: 400 },
  { day: "Tue", sales: 300 },
  { day: "Wed", sales: 500 },
  { day: "Thu", sales: 700 },
  { day: "Fri", sales: 200 },
  { day: "Sat", sales: 900 },
  { day: "Sun", sales: 650 },
];

export default function AdminDashboard() {

  const {orders, fetchOrders, products} = useAppContext()
  const [totalOrderCount, setTotalOrderCount] = useState('0')
  const [outOfStock, setOutOfStock] = useState('0')
  const [totalProductCount, setTotalProductCount] = useState('0')
  const [totalOrderAmount,setTotalOrderAmount] = useState('0')

  const orderCount = () =>{
    setTotalOrderCount(orders.length)
  }

  const outOfStockItems = ()=>{
    let outOfStockCount = 0
    products.map((product)=>{
      if(product.inStock == false){
        outOfStockCount+=1
      }
    })
    setOutOfStock(outOfStockCount)
  }

  const productCount = () =>{
    setTotalProductCount(products.length)
  }

  console.log(outOfStock)


  const setAmount = ()=>{
    let total = 0
    orders.map((item)=>{
      if(item.status == "Delivered"){
        total+=item.amount
      }
    })
    setTotalOrderAmount(total)
  }

  useEffect(()=>{
    fetchOrders()
    outOfStockItems()
  },[])

  useEffect(()=>{
    if(orders.length > 0){
      orderCount()
    }
  })

  useEffect(()=>{
    if(products.length > 0){
      productCount()
    }
  })

  useEffect(()=>{
    if(orders.length > 0){
      setAmount()
    }
    
  },[orders])

  //console.log(totalOrderAmount)
  //console.log(count)



  return (
    <div className="min-h-screen bg-gray-100 flex">
    
      <main className=" flex-1 p-6 space-y-6">

        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold"  >Dashboard</h1>
          <div className="flex gap-4">
            <button className="text-gray-500 hover:text-gray-700">🔔</button>
            <button className="text-gray-500 hover:text-gray-700">⚙️</button>
          </div>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-2xl font-bold">{totalOrderCount}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">Total Products</p>
            <p className="text-2xl font-bold">{totalProductCount}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">Out of Stock Items</p>
            <p className="text-2xl font-bold">{outOfStock}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="text-2xl font-bold">{totalOrderAmount}</p>
          </div>
        </div>

        {/* Sales Data Placeholder */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Weekly Sales</h2>
          <ul className="space-y-2">
            {salesData.map(({ day, sales }) => (
              <li key={day} className="flex justify-between text-gray-700">
                <span>{day}</span>
                <span>${sales}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}