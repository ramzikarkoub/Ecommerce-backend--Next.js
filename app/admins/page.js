"use client";
import React from "react";
import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";

export default function Admins() {
  const [admins, setAdmins] = useState([]);
  const [adminEmail, setAdminEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const fetchAdmins = async () => {
    const response = await fetch("api/admins");
    const data = await response.json();

    setAdmins(data);
  };
  useEffect(() => {
    fetchAdmins();
  }, []);
  console.log(admins);

  const handleDelite = async (ad) => {
    console.log(ad);
    // const hasConfirmed = confirm("Are you sure you want to delete this admin?");
    const hasConfirmed = Swal.fire({
      title: `Do you want to delete ${ad.username} ?`,
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
      customClass: {
        actions: "my-actions",
        confirmButton: "order-2",
        denyButton: "order-3",
      },
    });
    console.log(hasConfirmed);
    if ((await hasConfirmed).isConfirmed) {
      try {
        const response = await fetch(`api/admins/${ad._id.toString()}`, {
          method: "DELETE",
        });
        const FiltredAdmins = admins.filter((i) => i._id !== ad._id);
        Swal.fire({
          position: "top-middle",
          icon: "success",
          title: "Admin deleted!",
          showConfirmButton: false,
          timer: 1500,
        });
        deleted;
        setAdmins(FiltredAdmins);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const saveAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("api/admins", {
        method: "POST",
        body: JSON.stringify({ adminEmail, userName, image }),
      });

      if (response.ok) {
        Swal.fire({
          position: "top-middle",
          icon: "success",
          title: "Admin added!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
    } finally {
      fetchAdmins();
    }
  };

  const handleOnChange = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    const files = e.target?.files;
    console.log(files);
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

        setImage(data.secure_url);
      }
      setIsUploading(false);
    }
  };

  return (
    <div>
      <form onSubmit={saveAdmin}>
        <h1>Admins page</h1>
        <input
          type="text"
          placeholder="Admin email"
          value={adminEmail}
          onChange={(e) => setAdminEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="User name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <div className="flex gap-1 mb-4 mr-2 mt-3   ">
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
            />
          </label>
          <div className="flex flex-wrap gap-1 mb-4 mr-2">
            {image && (
              <img className="w-24 h-24 gap-1 rounded-md" alt="" src={image} />
            )}
            {isUploading && (
              <div className=" w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-md bg-white shadow-sm border border-primary">
                <ClipLoader color="#831843" size={65} />
              </div>
            )}
          </div>
        </div>
        <button type="submit" className="btn-primary">
          save
        </button>
      </form>
      <table className="basic mt-6">
        <thead className="text-sm text-gray-600 uppercase border-b border-gray-200 px-4 py-2">
          <tr>
            <td>
              <b>Admin email</b>
            </td>
            <td>
              <b>Username</b>
            </td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {admins.map((ad) => (
            <tr key={ad._id}>
              <td>{ad.email}</td>
              <td>{ad.username}</td>
              <td className="flex">
                <button
                  className="flex btn-primary"
                  onClick={(e) => handleDelite(ad)}
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
    </div>
  );
}
