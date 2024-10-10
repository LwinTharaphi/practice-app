"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { DataGrid } from "@mui/x-data-grid";
// import Link from "next/link";

export default function Home() {
  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "order", headerName: "Order", width: 150 },
    {
      field: "Action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            <button onClick={() => startEditMode(params.row)}>📝</button>
            <button onClick={() => deleteCategory(params.row)}>🗑️</button>
          </div>
        );
      },
    },
  ];

  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  console.log(process.env.NEXT_PUBLIC_API_URL);

  const [categoryList, setCategoryList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state
  const { register, handleSubmit, reset } = useForm();

  async function fetchCategory() {
    setLoading(true); // Set loading to true when fetching starts
    try {
      const data = await fetch(`${API_BASE}/category`);
      const c = await data.json();
      const c2 = c.map((category) => ({
        ...category,
        id: category._id,
      }));
      setCategoryList(c2);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching is done
    }
  }

  useEffect(() => {
    fetchCategory();
  }, []);

  async function handleCategoryFormSubmit(data) {
    if (editMode) {
      // Updating a category
      try {
        const response = await fetch(`${API_BASE}/category`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error("Failed to update category");
        }
        stopEditMode();
        fetchCategory();
      } catch (error) {
        console.error("Error updating category:", error);
      }
      return;
    }

    // Creating a new category
    try {
      const response = await fetch(`${API_BASE}/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to create category");
      }
      fetchCategory();
    } catch (error) {
      console.error("Error creating category:", error);
    }
  }

  function startEditMode(category) {
    reset(category);
    setEditMode(true);
  }

  function stopEditMode() {
    reset({
      name: "",
      order: "",
    });
    setEditMode(false);
  }

  async function deleteCategory(category) {
    if (!confirm(`Are you sure to delete [${category.name}]`)) return;

    const id = category._id;
    try {
      const response = await fetch(`${API_BASE}/category/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete category");
      }
      fetchCategory();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit(handleCategoryFormSubmit)}>
        <div className="grid grid-cols-2 gap-4 w-fit m-4 border border-gray-800 p-2">
          <div>Category name:</div>
          <div>
            <input
              name="name"
              type="text"
              {...register("name", { required: true })}
              className="border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <div>Order:</div>
          <div>
            <input
              name="order"
              type="number"
              {...register("order", { required: true })}
              className="border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <div className="col-span-2 text-right">
            {editMode ? (
              <>
                <input
                  type="submit"
                  className="italic bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  value="Update"
                />
                {" "}
                <button
                  onClick={() => stopEditMode()}
                  className="italic bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  Cancel
                </button>
              </>
            ) : (
              <input
                type="submit"
                value="Add"
                className="w-20 italic bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
              />
            )}
          </div>
        </div>
      </form>

      <div className="mx-4">
        {loading ? (
          <p>Loading categories...</p>
        ) : (
          <DataGrid rows={categoryList} columns={columns} />
        )}
      </div>
    </main>
  );
}
