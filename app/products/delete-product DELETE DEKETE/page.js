// "use client";
// import React, { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function deleteProduct() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const productId = searchParams.get("id");
//   const [products, setproducts] = useState([]);
//   const [product, setProduct] = useState({
//     title: "",
//     description: "",
//     price: "",
//     images: [],
//   });

//   useEffect(() => {
//     const getProductDetails = async () => {
//       const response = await fetch(`/api/product/${productId}`);
//       const data = await response.json();
//       console.log(data);
//       setProduct({
//         title: data.title,
//         description: data.description,
//         price: data.price,
//       });
//     };

//     if (productId) getProductDetails();
//   }, [productId]);

//   const handleDelite = async (product) => {
//     try {
//       await fetch(`/api/product/${productId.toString()}`, {
//         method: "DELETE",
//       });
//       const filteredProducts = products.filter(
//         (item) => item._id !== productId
//       );
//       setproducts(filteredProducts);
//       router.push("/products");
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   function goBack() {
//     router.push("/products");
//   }
//   return (
//     <div>
//       <h1 className="text-center">
//         Do you really want to delete &nbsp;&quot;{product.title}&quot;?
//       </h1>
//       <div className="flex gap-2 justify-center">
//         <button onClick={handleDelite} className="btn-red">
//           Yes
//         </button>
//         <button className="btn-gray" onClick={goBack}>
//           NO
//         </button>
//       </div>
//     </div>
//   );
// }
