"use client"

import { Edit, Save, Search, Trash2 } from "lucide-react"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"

interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number | string;
    sales: number | string;
    image: string;
}

export const ProductsTable = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState("")
    const [editingRow, setEditingRow] = useState<string|null>(null)

    

    const filterProducts = useMemo(()=>{
        return products.filter( product => product.name.toLowerCase().includes( searchTerm.toLowerCase() )||
                                           product.category.toLowerCase().includes( searchTerm.toLowerCase())
    )

    }, [searchTerm, products])

    useEffect(() => {
        fetch("/data/data.json").then(res => res.json())
            .then(data => setProducts(data.products))
    }, [])

    const hanldeEditClick = (id: string) => {
      setEditingRow(id)
    };

    const handleSaveClick = () => {
      setEditingRow(null)
    };

    const handleChange = (id: string, field: keyof Product, value: string) => {
      
        if(!/^\d*\.?\d*$/.test(value)) return;
        setProducts((prevProducts)=> prevProducts.map((product) => product.id === id ? {...product, [field]: Number(value)} : product ))

    };

    const handleDelete = (id:string) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this Product?")
        if (confirmDelete){
            setProducts((prevProducts) => prevProducts.filter( (product) => product.id !== id ))
        }
    }


    return (
        <div className="bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-[#1f1f1f] mx-2 md:mx-0 animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 md:gap-0">
                <h2 className="text-lg md:text-xl font-semibold text-gray-100 text-center md:text-left">
                    ProductsTable
                </h2>

                <div className="relative w-full md:w-auto">
                    <input
                        type="text"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                        placeholder="Search product..."
                        className="bg-[#2f2f2f] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 text-sm"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                        <tr>
                            {
                                [
                                    "Name",
                                    "Product ID",
                                    "Category",
                                    "Price",
                                    "Stock",
                                    "Sales",
                                    "Actions"
                                ].map(header => (
                                    <th key={header} className="px-3 md:px-6 py-2 md:py3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden md:table-cell">
                                        {header}
                                    </th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {
                            filterProducts.map(product => (
                                <tr key={product.id} className={`flex flex-col md:table-row mb-4 md:mb-0 border-b md:border-b-0 border-gray-700 md:border-none p-2 md:p-0 ${ editingRow === product.id ? "bg-[#2f2f2f] ring-gray-500": "" }`}>
                                    <td className="md:hidden px-3 py-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <Image src={product.image} alt={product.name} width={36} height={36} className="w-9 h-9 rounded-full" />
                                                <div className="ml-3">
                                                    <div className="text-sm font-medium text-gray-100">
                                                        { product.name }
                                                    </div>
                                                    <div className="text-xs text-gray-400">
                                                        ID: { product.id }
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex space-x-1 -mt-1 -mr-1">
                                                <button className="text-indigo-500 hover:text-indigo-300" onClick={() => editingRow === product.id ? handleSaveClick() : hanldeEditClick(product.id)}>
                                                    {
                                                        editingRow === product.id
                                                        ? <Save size={16} />
                                                        : <Edit size={16} />
                                                    } 
                                                </button>
                                                <button className="text-red-500 hover:text-red-300" onClick={() => handleDelete(product.id)}><Trash2 size={16} /> </button>
                                            </div>
                                        </div>

                                        <div className="mt-2 text-xs text-gray-300">
                                            <div>
                                                Category: { product.category }
                                            </div>
                                            {
                                                [
                                                    "price",
                                                    "stock", 
                                                    "sales"
                                                ].map( field => (
                                                    <div key={field}> 
                                                        <span className="capitalize">{field}: </span>
                                                        {
                                                            editingRow === product.id
                                                            ? <input type="text" className="bg-transparent text-white border border-gray-400 w-16 text-center text-xs ml-1" value={product[field as keyof Product]} onChange={(e)=> handleChange(product.id, field as keyof Product, e.target.value)} />
                                                            : (
                                                                field === "price"
                                                                ? `$${ product[field].toFixed(2) }`
                                                                : product[field as keyof Product]
                                                            )
                                                        }
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </td>
                                    <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                                        <div className="flex items-center">
                                            <Image src={product.image} alt={product.name} width={40} height={40} className="w-10 h-10 rounded-full" />
                                            <div className="ml-4">{ product.name }</div>
                                        </div>
                                    </td>

                                    <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        { product.id }
                                    </td>

                                    <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        { product.category }
                                    </td>

                                    {
                                        [
                                            "price",
                                            "stock", 
                                            "sales"
                                        ].map( (field) => (
                                            <td key={field} className={
                                                `hidden md:table-cell  px-6 py-4 whitespace-nowrap text-sm text-gray-300 ${ editingRow === product.id ? "border border-gray-400" : "" }`
                                            }> 
                                                {
                                                    editingRow === product.id 
                                                    ? <input type="text" className="bg-transparent text-white border-none outline-none w-16 text-center" value={product[field as keyof Product]} onChange={(e)=> handleChange( product.id, field as keyof Product, e.target.value)} /> 
                                                    : (
                                                        field === "price"
                                                        ? `$${product[field].toFixed(2)}`
                                                        :product[field as keyof Product]
                                                    )

                                                }
                                            </td>
                                        ))
                                    }

                                    <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        <div className="flex space-x-1 -ml-2">
                                            <button className="text-indigo-500 hover:text-indigo-300 mr-1 cursor-pointer" onClick={() => editingRow === product.id ? handleSaveClick() : hanldeEditClick(product.id)}>
                                               {
                                                        editingRow === product.id
                                                        ? <Save size={18} />
                                                        : <Edit size={18} />
                                                    } 
                                            </button>
                                            <button className="text-red-500 hover:text-red-300 cursor-pointer" onClick={() => handleDelete(product.id)}>
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
