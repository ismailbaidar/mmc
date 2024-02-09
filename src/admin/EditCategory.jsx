import React, { useEffect, useRef, useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { GridDeleteIcon } from "@mui/x-data-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setPaths } from "../Features/AdminNavigationSlice";
import {
  addCategory,
  addSubCategory,
  updateSubCategory,
} from "../Features/CategorySlice";
import { useParams } from "react-router-dom";

const EditcategoryPage = () => {
  const [categoryData, setCategoryData] = useState({
    categoryName: "",
    parentCategory: "",
  });

  const categories = useSelector((state) => state.CategoryReducer.categories);

  const dispatch = useDispatch();
  const categoryName = useRef();
  const parentCategoryId = useRef();
  useEffect(() => {
    dispatch(setPaths(["Dashboard", "Categories", "Create"]), []);
  }, []);

  const handleChange = (e) => {
    setCategoryData({
      ...categoryData,
      [e.target.name]: e.target.value,
    });
  };

  const { id } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (parentCategoryId.current.value == "") {
      dispatch(addCategory({ nameCategory: categoryName.current.value }));
    } else {
      dispatch(
        updateSubCategory({
          subCategoryId: id,
          categoryId: parentCategoryId.current.value,
          nameSubCategory: categoryName.current.value,
        })
      );
    }
  };

  return (
    <form className="create-category-admin">
      <TextField
        label="Category Name"
        name="categoryName"
        inputRef={categoryName}
        fullWidth
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel id="parentCategoryLabel">Parent Category</InputLabel>
        <Select
          inputRef={parentCategoryId}
          labelId="parentCategoryLabel"
          name="parentCategory"
          value={categoryData.parentCategory}
          onChange={handleChange}
        >
          <MenuItem value="">None</MenuItem>
          {categories.map((category) => {
            return (
              <MenuItem value={category.categoryId} key={category.categoryId}>
                {category.nameCategory}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <Button
        type="button"
        className="submit-form-button"
        onClick={handleSubmit}
      >
        Update
      </Button>
    </form>
  );
};

export default EditcategoryPage;
