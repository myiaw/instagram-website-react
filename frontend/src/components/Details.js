import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import AddComment from "./AddComment";
import Comments from "./Comments";
import {UserContext} from "../userContext";

function Details() {
    const {id} = useParams();
    const [photo, setPhoto] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchPhoto = async () => {
            try {
                const res = await fetch(`http://localhost:3001/photos/${id}`);
                const data = await res.json();
                console.log("Datakigg:", data);
                setPhoto(data);
            } catch (e) {
                console.error(e);
            }
        };
        fetchPhoto().then(r => console.log(r));
    }, [id]);

    const openCommentField = () => {
        setIsOpen(current => !current);
    };


    return (
        <div className="container my-5">
            {photo ? (
                <div className="row">
                    <div className="col-md-6">
                        <img
                            src={`http://localhost:3001/${photo.path}`}
                            alt={photo.name}
                            className="img-fluid rounded mt-4 mb-4"
                            style={{maxHeight: "600px"}}
                        />
                    </div>
                    <div className="col-md-6">
                        <h1 className="mt-4">{photo.name}</h1>
                        {photo.postedBy && <p>Posted by: {photo.postedBy.username}</p>}
                        <p>Likes: {photo.likes.length}</p>
                        <p>Views: {photo.views}</p>
                        <p>Posted at: {new Date(photo.postedAt).toLocaleString()}</p>
                        <p className="mt-4">{photo.description}</p>
                        <button className="btn btn-dark" onClick={openCommentField}>
                            Add Comment
                        </button>
                        <UserContext.Consumer>
                            {context => {
                                if (context.user && isOpen) {
                                    return <AddComment id={id} openCommentField={openCommentField}/>;
                                } else if (!context.user && isOpen) {
                                    return <p className="text-danger mt-2">You need to be logged in to comment.</p>;
                                }
                                return null;
                            }}
                        </UserContext.Consumer>
                        <Comments id={id} isOpen={isOpen}/>
                    </div>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );

}

export default Details;
