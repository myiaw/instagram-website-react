import Comment from "./Comment";
import {useEffect, useState} from "react";

function Comments(props) {
    const [comments, setComments] = useState([]);

    useEffect(function () {
        const id = props.id;
        const getComments = async function () {
            const res = await fetch(`http://localhost:3001/comments/${id}`);
            const data = await res.json();
            console.log('Data:', data);
            setComments(data);
        };
        getComments().then((r) => console.log(r));
    }, [props.isOpen]);


    return (
        <div>
            <h3>Comments:</h3>
            <ul>
                {Array.isArray(comments) &&
                    comments.map((comment) => (
                        <Comment comment={comment} key={comment._id}></Comment>
                    ))}
            </ul>
        </div>
    );
}

export default Comments;