import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import "./CategoryList.css";
import { deleteByCategoryId } from "../../services/CategoryService";
import { toast } from "react-toastify";

const CategoryList = ({ searchQuery }) => {
  const { categories, setCategories } = useContext(AppContext);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteCategory = async (categoryId) => {
    try {
      const response = await deleteByCategoryId(categoryId);
      if (response.status === 204) {
        const updatedCategories = categories.filter(
          (category) => category.categoryId != categoryId
        );
        setCategories(updatedCategories);
        toast.success("Category Deleted successfully");
      } else {
        toast.error("Failed to delete category");
      }
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  return (
    <div className="category-list-container" style={{ overflowX: "auto" }}>
      {/* Table view: visible on md and larger */}
      <div className="d-none d-sm-block">
        <table className="table table-bordered table-hover text-white">
          <thead>
            <tr className="bg-dark text-center">
              <th style={{ width: "10%" }}>Image</th>
              <th>Name</th>
              <th>Items</th>
              <th style={{ width: "10%" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((category, index) => {
              const bgColor = category.bgColour?.toLowerCase().trim();
              const textColor = bgColor === "#ffffff" ? "#000" : "#fff";

              return (
                <tr
                  key={index}
                  style={{
                    backgroundColor: bgColor,
                    color: textColor,
                  }}
                >
                  <td className="text-center">
                    <img
                      src={category.imgUrl}
                      alt={category.name}
                      className="category-image"
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                  </td>
                  <td
                    style={{
                      fontSize: "clamp(12px, 2vw, 16px)",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    {category.name}
                  </td>
                  <td
                    style={{
                      fontSize: "clamp(12px, 2vw, 16px)",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    {category.items} Items
                  </td>
                  <td
                    className="text-center"
                    style={{ verticalAlign: "middle" }}
                  >
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteCategory(category.categoryId)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Card view: visible only on small screens */}
      <div className="d-block d-sm-none">
        {categories.map((category, index) => {
          const bgColor = category.bgColour?.toLowerCase().trim();
          const textColor = bgColor === "#ffffff" ? "#000" : "#fff";

          return (
            <div
              key={index}
              className="card mb-3"
              style={{
                backgroundColor: bgColor,
                color: textColor,
                padding: "1rem",
                borderRadius: "8px",
              }}
            >
              <div className="d-flex align-items-center">
                <img
                  src={category.imgUrl}
                  alt={category.name}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                    borderRadius: "5px",
                    marginRight: "2rem",
                  }}
                />
                <div className="flex-grow-1 ">
                  <h5 style={{ margin: 0, fontSize: "clamp(14px, 2vw, 16px)" }}>
                    {category.name}
                  </h5>
                  <p style={{ margin: 0, fontSize: "clamp(12px, 2vw, 16px)" }}>
                    {category.items} Items
                  </p>
                </div>
                <button
                  className="btn btn-danger btn-sm ms-auto"
                  onClick={() => deleteCategory(category.categoryId)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;
