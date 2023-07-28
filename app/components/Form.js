"use client";
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useState, useEffect } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Form({
  // productId,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
  properties: assignedProperties,
}) {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const router = useRouter();
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [uploadData, setUploadData] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(assignedCategory || "");
  const [productProperties, setProductProperties] = useState(
    assignedProperties || {}
  );

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("/api/category");
      const data = await response.json();
      console.log(data);
      setCategories(data);
    };
    fetchCategories();
  }, []);
  console.log(categories);

  async function handleOnChange(event) {
    event.preventDefault();
    setIsUploading(true);

    const files = event.target?.files;
    if (files?.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        formData.append("file", file);

        formData.append("upload_preset", "my-uploads");

        const data = await fetch(
          "https://api.cloudinary.com/v1_1/dkyzsx1az/image/upload",
          {
            method: "POST",
            body: formData,
          }
        ).then((r) => r.json());

        setImages((d) => [...d, data.secure_url]);

        setUploadData(data);

        console.log(data);
      }
      setIsUploading(false);
    }
  }
  console.log(images);

  const saveProduct = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (productId) {
      try {
        const response = await fetch(`/api/product/${productId}`, {
          method: "PATCH",
          body: JSON.stringify({
            title: title,
            description: description,
            price: price,
            images: images,
            category: category,
            properties: productProperties,
          }),
        });
        console.log(title);
        console.log(images);
        if (response.ok) {
          alert("product updated!");
          router.push("/products");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      try {
        console.log(session);
        const response = await fetch("/api/product/new", {
          method: "POST",
          body: JSON.stringify({
            userId: session?.user.id,
            title: title,
            description: description,
            price: price,
            images: images,
            category: category,
            properties: productProperties,
          }),
        });
        if (response.ok) {
          alert("product created");
          router.push("/products");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  let propertiesToFill = [];
  if (categories.length > 0 && category) {
    let prop = categories.find(({ _id }) => _id === category);
    propertiesToFill.push(...prop.properties);
    console.log(propertiesToFill);
    if (prop.parentCategory?._id) {
      let parentProp = categories.find(
        ({ _id }) => _id === prop?.parentCategory?._id
      );
      propertiesToFill.push(...parentProp.properties);
      console.log(propertiesToFill);
    }
  }

  const setProdProperties = (propName, propValue) => {
    console.log(propName, propValue);
    setProductProperties((prev) => {
      const newProdProperties = { ...prev };
      console.log(newProdProperties);
      newProdProperties[propName] = propValue;
      console.log(newProdProperties);
      return newProdProperties;
    });
    console.log(productProperties);
  };
  console.log(productProperties);
  return (
    <form onSubmit={saveProduct}>
      <label htmlFor="title">Product Name</label>
      <input
        name="title"
        type="text"
        placeholder="product name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Category</label>
      <br />
      <select value={category} onChange={(ev) => setCategory(ev.target.value)}>
        <option value="">Uncategorized</option>
        {categories.length > 0 &&
          categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
      </select>
      {propertiesToFill.length > 0 &&
        propertiesToFill.map((p, i) => (
          <div key={i}>
            {p.name}
            <select
              value={productProperties[p.name]}
              onChange={(e) => setProdProperties(p.name, e.target.value)}
            >
              {p.values.map((v, index) => (
                <option key={index} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        ))}
      <div className="flex gap-1 mb-4 mr-2 mt-8   ">
        <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-md bg-white shadow-sm border border-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div className="w-24 ">Add image</div>
          <input
            type="file"
            name="file"
            onChange={handleOnChange}
            className="hidden"
            multiple
          />
        </label>
        <div className="flex flex-wrap gap-1 mb-4 mr-2">
          {images.map((i, k) => (
            <img key={k} className="w-24 h-24 gap-1 rounded-md" src={i} />
          ))}
          {isUploading && (
            <div className=" w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-md bg-white shadow-sm border border-primary">
              <ClipLoader color="#831843" size={65} />
            </div>
          )}
        </div>
      </div>
      <label htmlFor="price" value={price}>
        Price (in USD)
      </label>
      <input
        name="price"
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        id=""
        rows="5"
        placeholder="Product description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button type="submit" className="btn-primary">
        {isSubmitting ? "Saving" : "Save"}
      </button>
    </form>
  );
}
