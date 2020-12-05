import React from "react";

const CategoryForm = ({
  handleSubmit,
  setCategory,
  category,
  action,
  placeholder,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          onChange={(e) => setCategory(e.target.value)}
          placeholder={placeholder}
          value={category}
          className="form-control"
          autoFocus
          required
        />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-outline-primary">
          {action}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
