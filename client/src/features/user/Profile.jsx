import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { selectUser } from "../auth/authSlice";

export default function Profile() {
  const user = useSelector(selectUser);
  // As the state is going to be used for this component only, we will use local states
  const [avatarUploadError, setAvatartUploadError] = useState("");
  const [avatarImage, setAvatarImage] = useState("");
  const [isAvatarImageUploading, setIsAvatarImageUploading] = useState(false);
  const [formData, setFormData] = useState([{}]);

  const imageRef = useRef("");

  // click listener for image click
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setIsAvatarImageUploading(true);

    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("id", user._id);

    try {
      const res = await fetch(`/api/user/avatar/${user._id}`, {
        method: "POST",
        body: formData,
      });
      const responseData = await res.json();
      if (responseData.success) {
        setIsAvatarImageUploading(false);
        setAvatarImage(responseData.avatarUrl);
      } else {
        setAvatartUploadError("Error uploading avatar image");
        setIsAvatarImageUploading(false);
        setAvatarImage(user.avatar);
      }
    } catch (error) {
      setAvatartUploadError("Error uploading avatar image");
      setIsAvatarImageUploading(false);
      setAvatarImage(user.avatar);
    }
  };
  // trigger file upload

  // send api call to save

  // show loading icon

  // check firebase or to store in backend server

  // If success show the uploaded image

  // If failed, revert the image back to original

  // use toast for showing error / success

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <div
          className="relative w-fit mx-auto hover:cursor-pointer min-h-8"
          onClick={() => imageRef.current.click()}
        >
          {isAvatarImageUploading ? (
            <FaSpinner
              icon="spinner"
              className="spinner size-8 text-gray-400"
            />
          ) : (
            (avatarImage && (
              <>
                <img
                  src={avatarImage}
                  alt="profile"
                  className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
                />
                <MdEdit className="absolute bottom-0 right-0 text-gray-400 " />
              </>
            )) ||
            (user.avatar && (
              <>
                <img
                  src={user.avatar}
                  alt="profile"
                  className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
                />
                <MdEdit className="absolute bottom-0 right-0 text-gray-400 " />
              </>
            ))
          )}
        </div>
        <p className="text-sm self-center">
          {avatarUploadError && (
            <span className="text-red-700">{avatarUploadError}</span>
          )}
        </p>
        <input
          type="file"
          name="avatar"
          accept="image/*"
          ref={imageRef}
          hidden
          onChange={handleImageUpload}
        />
        <input
          type="text"
          placeholder="username"
          id="username"
          name="username"
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          name="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          name="password"
          className="border p-3 rounded-lg"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
