import "../App.css";
const Feed = ({ data }) => {
  return (
    <div className="row">
      <div className="col-3">
        <img src={data.image} width="100%" />
      </div>
      <div className="col-9">
        <div className="row">
          <div className="col-12">
            <h4>{data.title}</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <p>{data.description}</p>
          </div>
          <div className="col-3 offset-9 text-right">
            <p>{data.author}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Feed;
