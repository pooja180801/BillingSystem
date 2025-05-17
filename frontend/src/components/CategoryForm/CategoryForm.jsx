import React, { useContext, useState } from "react";
import { assets } from "../../assets/Assets";
import { toast } from "react-toastify";
import { addCategory } from "../../services/CategoryService";
import { AppContext } from "../../context/AppContext";

const CategoryForm = () => {
  const { setCategories, categories } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    bgColour: "#2c2c2c",
  });

  const onChangeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Select image for category");
      return;
    }

    setLoading(true);
    
    const formData = new FormData();
    formData.append("category", JSON.stringify(data));
    formData.append("file", image);
    console.log(formData)

    try {
      const response = await addCategory(formData);
      if (response.status === 201) {
        setCategories([...categories, response.data]);
        toast.success("Category added successfully!");
        setData({
          name: "",
          description: "",
          bgColour: "#2c2c2c",
        });
        setImage(null);
      } else {
        toast.error("Failed to add category");
      }
    } catch (error) {
      toast.error("Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-100">
      <div className="card w-100 h-100">
        <div className="card-body">
          <form onSubmit={onSubmitHandler}>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                <img
                  src={image ? URL.createObjectURL(image) : assets.upload}
                  alt=""
                  width={48}
                />
              </label>
              <input
                type="file"
                name="image"
                id="image"
                className="form-control"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                placeholder="Category Name"
                onChange={onChangeHandler}
                value={data.name}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                rows="5"
                name="description"
                id="description"
                className="form-control"
                placeholder="Write content here.."
                onChange={onChangeHandler}
                value={data.description}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="bgColour" className="form-label">
                Background Colour
              </label>
              <br />
              <input
                type="color"
                name="bgColour"
                id="bgColour"
                placeholder="#ffffff"
                onChange={onChangeHandler}
                value={data.bgColour}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Loading..." : "Save"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
