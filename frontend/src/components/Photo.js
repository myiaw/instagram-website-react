import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {UserContext} from "../userContext";

function Photo(props) {
    const [likes, setLikes] = useState(props.photo.likes.length);
    const [views, setViews] = useState(props.photo.views);
    const handleLikeClick = async function () {
        const id = props.photo._id;
        const res = await fetch(`http://localhost:3001/photos/${id}/like`, {
            method: "PUT",
            credentials: "include",
        });
        const data = await res.json();
        setLikes(data.likes);
    }
    const handleViewAmount = async function () {
        const id = props.photo._id;
        const res = await fetch(`http://localhost:3001/photos/${id}/view`, {
            method: "PUT",
        });
        const data = await res.json();
        setViews(data.views);
        useNavigate.push(`/photos/${id}`);
    };

    const handleReportClick = async function () {
        const id = props.photo._id;
        const res = await fetch(`http://localhost:3001/photos/${id}/report`, {
            method: "PUT",
            credentials: "include",
        });
        if (res.status === 401) {
            alert("You must be logged in to report a photo");
        } else {
            const data = await res.json();
            console.log(data);
        }
    }

    return (
        <div className="row border mb-4 p-3">
            <div className="col-4">
                <img
                    className="img-fluid"
                    src={`http://localhost:3001/${props.photo.path}`}
                    alt={props.photo.name}
                    style={{width: "100%", height: "auto", border: "1px solid gray"}}
                />
                <UserContext.Consumer>
                    {context => context.user && (
                        <div className="mt-2">
                            <button
                                className="btn btn-danger btn-sm" onClick={handleReportClick}>
                                Report
                            </button>
                        </div>
                    )}
                </UserContext.Consumer>
            </div>
            <div className="col-8">
                <div className="row">
                    <div className="col-12">
                        <h4 className="fw-bold">{props.photo.name}</h4>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-6">
                        <small className="text-muted">
                            Uploaded by: {props.photo.postedBy.username}
                        </small>

                    </div>
                    <UserContext.Consumer>
                        {context => context.user && (
                            <div className="col-6 text-end">
                                <small className="text-muted ml-2">Like</small>
                                <button className="btn btn-outline-danger btn-lg ms-2" onClick={handleLikeClick}>
                                    <i className="bi bi-heart"></i>
                                </button>
                            </div>
                        )}
                    </UserContext.Consumer>
                </div>
                <div className="row">
                    <div className="col-12">
                        <small className="text-muted">
                            {new Date(props.photo.postedAt).toLocaleString(undefined, {
                                dateStyle: "short",
                                timeStyle: "short",
                            })}
                        </small>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-12">
                        <Link to={`/photos/${props.photo._id}`} onClick={handleViewAmount}
                              className="btn btn-info btn-sm">
                            View Details
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Photo;
