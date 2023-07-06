"use client";
import Swal from "sweetalert2";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
// import Link from "next/link";
// // import { useRouter } from "next/navigation";
// import axios from "axios";

export default function Categories() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const router = useRouter();
  const [editingMode, setEditingMode] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedCategory] = useState(null);
  const [properties, setProperties] = useState([]);
  const [name, setName] = useState("");
  // const existingCate = editedCategory?.parentCategory?._id;
  const [parentCategory, setParentCategory] = useState("");

  // get categories
  const fetchCategories = async () => {
    const response = await fetch("api/category");
    const data = await response.json();
    setCategories(data);
  };
  useEffect(() => {
    fetchCategories();
    console.log(categories);
  }, []);
  console.log(categories);
  //Delete Category
  const handleDelite = (category) => {
    console.log(category);
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete ${category.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Swal.fire("Deleted!", "The category has been deleted.", "success");
        Swal.fire({
          position: "top-middle",
          icon: "success",
          title: "Category deleted!",
          showConfirmButton: false,
          timer: 1500,
        });
        try {
          await fetch(`/api/category/${category._id.toString()}`, {
            method: "DELETE",
          });
          const filteredCategories = categories.filter(
            (item) => item._id !== category._id
          );
          setCategories(filteredCategories);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
  // add category
  const saveCategory = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = {
      name,
      parentCategory: parentCategory,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values.split(","),
      })),
    };
    console.log(data);
    if (editedCategory) {
      // setEditingMode(true);
      try {
        const response = await fetch(`/api/category/${editedCategory._id}`, {
          method: "PATCH",
          body: JSON.stringify(data),
        });
        console.log(parentCategory);
        if (response.ok) {
          Swal.fire({
            position: "top-middle",
            icon: "success",
            title: "Category Edited!",
            showConfirmButton: false,
            timer: 1500,
          });
          // fetchCategories();
          console.log(categories);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitting(false);
        setEditingMode(false);
      }
    } else {
      try {
        const response = await fetch("/api/category/new", {
          method: "POST",
          body: JSON.stringify(data),
        });
        console.log(parentCategory);
        if (response.ok) {
          Swal.fire({
            position: "top-middle",
            icon: "success",
            title: "Category Created!",
            showConfirmButton: false,
            timer: 1500,
          });
          // fetchCategories();
          console.log(categories);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
    }
    setName("");
    setParentCategory("");
    setProperties([]);
    fetchCategories();
  };

  //Edit category
  const editCategory = (category) => {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category?.parentCategory?._id || "");
    setEditingMode(true);
    setProperties(
      category?.properties?.map(({ name, values }) => ({
        name,
        values: values.join(","),
      }))
    );
  };

  const addProperties = () => {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
    console.log(properties);
  };

  const removeProperty = (property, index) => {
    setProperties((prev) => {
      return properties.filter((p, pIndex) => {
        return pIndex !== index;
      });
    });
    console.log(properties);
    // console.log(index);
  };
  const handlePropertyNameChange = (index, property, newName) => {
    setProperties((prev) => {
      const newProperties = [...prev];
      newProperties[index].name = newName;
      return newProperties;
    });
    console.log(properties);
  };
  const handlePropertyValueChange = (index, property, newValue) => {
    setProperties((prev) => {
      console.log(index, newValue);
      const newProperties = [...prev];
      newProperties[index].values = newValue;
      return newProperties;
    });
    console.log(properties);
  };

  return (
    <div>
      <h1>Categories</h1>
      <label>
        {editedCategory
          ? `Edit category ${editedCategory.name}`
          : "Create new category"}
      </label>
      <form className=" gap-1" onSubmit={saveCategory}>
        <input
          type="text"
          name="name"
          placeholder="category name"
          className="mb-3"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <select
          onChange={(e) => setParentCategory(e.target.value)}
          value={parentCategory}
        >
          <option value="">No parent category</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option
                key={category._id ? category._id : "No parent category"}
                value={category._id}
              >
                {category.name}
              </option>
            ))}
        </select>

        <div className="mt-3">
          <label>Properties</label>
          <button
            type="button"
            onClick={addProperties}
            className="btn-primary ml-3 mb-3"
          >
            Add Properties
          </button>

          {properties.length > 0 &&
            properties.map((property, index) => (
              <div className="flex gap-1 mb-2 " key={index}>
                <input
                  type="text"
                  placeholder="name (exemple:color)"
                  value={property.name}
                  onChange={(ev) =>
                    handlePropertyNameChange(index, property, ev.target.value)
                  }
                  className="mb-0"
                  required
                />
                <input
                  type="text"
                  placeholder="values (separated by comma)"
                  value={property.values}
                  className="mb-0"
                  onChange={(ev) =>
                    handlePropertyValueChange(index, property, ev.target.value)
                  }
                  required
                />
                <button
                  className="flex btn-primary mr-2"
                  onClick={() => removeProperty(property, index)}
                  type="button"
                >
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
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                  Remove
                </button>
              </div>
            ))}

          <div className="flex">
            <button className="flex btn-primary" type="submit">
              {editingMode
                ? isSubmitting
                  ? "Editing"
                  : "Save"
                : isSubmitting
                ? "Saving"
                : "save"}
            </button>
            {editingMode && (
              <button
                className="ml-2 btn-primary"
                onClick={() => {
                  setEditingMode(false);
                }}
                type="button"
              >
                cancel
              </button>
            )}
          </div>
        </div>
      </form>
      {!editingMode && (
        <table className="basic mt-6">
          <thead className="text-sm text-gray-600 uppercase border-b border-gray-200 px-4 py-2">
            <tr>
              <td>
                <b>Category name</b>
              </td>
              <td>
                <b>Parent category</b>
              </td>
              <td>
                <b></b>
              </td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 &&
              categories.map((category) => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>{category?.parentCategory?.name}</td>
                  <td className="flex">
                    <button
                      className="flex btn-primary mr-2"
                      // href={
                      //   ""
                      //   // `/categories/update-category?id=${category._id}`
                      // }
                      onClick={() => editCategory(category)}
                      type="button"
                    >
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
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      className="flex btn-primary"
                      onClick={() => handleDelite(category)}
                    >
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
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                      <p>DELETE</p>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
