import {useState} from "react";

function AddComment(props) {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = props.id;

        const res = await fetch(`http://localhost:3001/comments/${id}`, {
            method: "POST",
            credentials: "include",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                content: comment,
                photoId: id
            })
        });
        const data = await res.json();
        setComment("");
        props.openCommentField();
    };
    const [comment, setComment] = useState("");
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="commentInput">Comment</label>
                <textarea
                    className="form-control"
                    id="commentInput"
                    rows="3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}

                />
            </div>
            <button type="submit" className="btn btn-success mt-3">
                Submit
            </button>
        </form>
    );

}

export default AddComment;