import {useState, useEffect} from 'react';
import Photo from './Photo';

function Photos(props) {
    const [photos, setPhotos] = useState([]);

    useEffect(function () {
        const getPhotos = async function () {
            const res = await fetch('http://localhost:3001/photos/');
            const data = await res.json();
            console.log("img data: " + data);
            setPhotos(data);
        };
        getPhotos().then((r) => console.log(r));
    }, []);

    return (
        <div>
            <h3>Photos:</h3>
            <ul>
                {Array.isArray(photos) &&
                    photos
                        .filter((photo) => photo.reports.length < 3)
                        .map((photo) => (
                            <li key={photo._id}>
                                <Photo photo={photo}></Photo>
                            </li>
                        ))}
            </ul>
        </div>
    );
}

export default Photos;
