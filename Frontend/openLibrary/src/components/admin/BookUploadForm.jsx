import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Upload, Loader, X } from "lucide-react";
import { GENRES, API_URL } from "../../config/config";
const BookUploadForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
  });

  const [coverImage, setCoverImage] = useState(null);
  const [bookFile, setBookFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const bookInputRef = useRef(null);
  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  const handleBookDivClick = () => {
    bookInputRef.current?.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCoverChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBookFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setBookFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bookFile) {
      toast.error("Please upload a book file");
      return;
    }

    if (!formData.title || !formData.genre) {
      toast.error("Title and genre are required");
      return;
    }

    try {
      setIsSubmitting(true);

      const uploadData = new FormData();
      uploadData.append("title", formData.title);
      uploadData.append("genre", formData.genre);

      if (formData.author) {
        uploadData.append("author", formData.author);
      }

      if (formData.description) {
        uploadData.append("description", formData.description);
      }

      if (coverImage) {
        uploadData.append("coverImage", coverImage);
      }

      uploadData.append("bookFile", bookFile);

      await axios.post(`${API_URL}/books`, uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Book uploaded successfully!");
      navigate("/books");
    } catch (error) {
      console.error("Error uploading book:", error);
      toast.error("Failed to upload book. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeCoverPreview = () => {
    setCoverPreview(null);
    setCoverImage(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Book Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
              placeholder="Enter book title"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
              placeholder="Enter author name"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="genre"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Genre <span className="text-red-500">*</span>
            </label>
            <select
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              <option value="" disabled>
                Select a genre
              </option>
              {GENRES.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
              placeholder="Brief description of the book"
            />
          </div>
        </div>

        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cover Image
            </label>
            {coverPreview ? (
              <div className="relative w-full aspect-[2/3] overflow-hidden rounded-md border border-gray-300">
                <img
                  src={coverPreview}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={removeCoverPreview}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                >
                  <X className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            ) : (
              <div
                className="  border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer"
                onClick={handleDivClick}
              >
                <Upload className=" text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-2">
                  Click to upload cover image
                </p>
                <p className="text-xs text-gray-400">
                  PNG, JPG or JPEG (Max. 2MB)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  id="coverImage"
                  name="coverImage"
                  onChange={handleCoverChange}
                  accept="image/png, image/jpeg, image/jpg"
                  className="hidden"
                />
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Book File (PDF) <span className="text-red-500">*</span>
            </label>
            <div
              className={`border-2 ${
                bookFile
                  ? "border-green-300 bg-green-50"
                  : "border-dashed border-gray-300"
              } 
    rounded-md p-6 flex flex-col items-center justify-center cursor-pointer`}
              onClick={handleBookDivClick}
            >
              {bookFile ? (
                <div className="text-center">
                  <div className="bg-green-100 rounded-full p-2 inline-flex items-center justify-center mb-2">
                    <Upload className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    {bookFile.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {(bookFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                  <button
                    type="button"
                    onClick={() => setBookFile(null)}
                    className="mt-2 text-xs text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-2">
                    Click to upload PDF file
                  </p>
                  <p className="text-xs text-gray-400">
                    PDF files only (Max. 20MB)
                  </p>
                </>
              )}
              <input
                ref={bookInputRef}
                type="file"
                id="bookFile"
                name="bookFile"
                onChange={handleBookFileChange}
                accept="application/pdf"
                className="hidden"
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => navigate("/admin")}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 flex items-center justify-center disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader className="animate-spin h-4 w-4 mr-2" />
              Uploading...
            </>
          ) : (
            "Upload Book"
          )}
        </button>
      </div>
    </form>
  );
};

export default BookUploadForm;
