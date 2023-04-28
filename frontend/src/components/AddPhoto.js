import {useContext, useState} from 'react';
import {Navigate} from 'react-router';
import {UserContext} from '../userContext';

function AddPhoto(props) {
    const userContext = useContext(UserContext);
    const [name, setName] = useState('');
    const [file, setFile] = useState('');
    const [uploaded, setUploaded] = useState(false);

    async function onSubmit(e) {
        e.preventDefault();

        if (!name) {
            alert('Enter name!');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', file);
        const res = await fetch('http://localhost:3001/photos', {
            method: 'POST',
            credentials: 'include',
            body: formData,
        });
        const data = await res.json();

        setUploaded(true);
    }

    return (
        <div className="container mt-5">
            {!userContext.user && <Navigate replace to="/login"/>}
            {uploaded && <Navigate replace to="/"/>}
            <h1 className="mb-4">Upload</h1>
            <form className="row g-3" onSubmit={onSubmit}>
                <div className="col-12">
                    <label htmlFor="inputName" className="form-label">Title:</label>
                    <input type="text" className="form-control" id="inputName" placeholder="Title" value={name}
                           onChange={(e) => {
                               setName(e.target.value)
                           }} required/>
                </div>
                <div className="col-12">
                    <label htmlFor="inputFile" className="form-label">Choose image:</label>
                    <input type="file" className="form-control" id="inputFile" onChange={(e) => {
                        setFile(e.target.files[0])
                    }} required/>
                </div>
                <div className="col-12">
                    <button className="btn btn-primary" type="submit">Upload</button>
                </div>
            </form>
        </div>
    );
}

export default AddPhoto;
