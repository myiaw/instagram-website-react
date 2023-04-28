function Comment(props) {
    return (
        <div className="card my-3">
            <div className="card-body">
                <h4 className="card-text ">{props.comment.content}</h4>
                <div>
                    <div className="mb-2"><small className="card-subtitle text-muted">Posted
                        on {new Date(props.comment.postedAt).toLocaleString()}</small></div>
                    <div><small className="card-subtitle text-muted">Posted by {props.comment.postedBy.username}</small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment;
