import { useForm } from "react-hook-form";
import "../App.css";

const NewFeed = ({ setFormData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    setFormData(data);
    reset();
  };
  return (
    <div className="App">
      <p>
        This page allows you to upload a news feed to the reporters' headquarter
        so that it appears on this website to you and to other viewers
        concurrently.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">Title of the News</label>
          <input
            name="title"
            type="text"
            placeholder="Enter title of the news"
            {...register("title", {
              required: "Required",
            })}
          />
          {errors.title && <p>⚠ Please enter title of the news article</p>}
        </div>
        <div>
          <label htmlFor="description">Description of the News in detail</label>
          <input
            name="description"
            type="text"
            placeholder="Enter description of the news"
            {...register("description", {
              required: "Required",
            })}
          />
          {errors.description && (
            <p>⚠ Please enter description of the news article</p>
          )}
        </div>
        <div>
          <label htmlFor="image">Image URL of the News</label>
          <input
            name="image"
            type="text"
            placeholder="Enter image URL (link of the image) for the news"
            {...register("image", {
              required: "Required",
            })}
          />
        </div>
        <div>
          <label htmlFor="author">Name of the author of the News</label>
          <input
            name="author"
            type="text"
            placeholder="Enter author name against the news"
            {...register("author", {
              required: "Required",
            })}
          />
          {errors.author && <p>⚠ Please enter author of the news article</p>}
        </div>
        <input type="submit" />
      </form>
    </div>
  );
};
export default NewFeed;
