import {useContext, useEffect, useState} from 'react';
import {UserContext} from '../userContext';
import {Navigate} from 'react-router-dom';

function Profile() {
    const userContext = useContext(UserContext);
    const [profile, setProfile] = useState({});

    useEffect(function () {
        const getProfile = async function () {
            const res = await fetch("http://localhost:3001/users/profile", {credentials: "include"});
            const data = await res.json();
            setProfile(data);
        }
        getProfile();
    }, []);

    const [overallCounts, setOverallCounts] = useState(0);
    const [overallLikes, setOverallLikes] = useState(0);

    useEffect(function () {
        const getCounts = async function () {
            try {
                const res = await fetch(`http://localhost:3001/users/postAmount/`, {credentials: "include"});
                const data = await res.json();
                setOverallCounts(data.amount);
            } catch (error) {
                console.error('Error fetching the post count:', error);
            }
        }
        getCounts();
    }, []);

    useEffect(function () {
        const getLikes = async function () {
            try {
                const res = await fetch(`http://localhost:3001/users/likeAmount/`, {credentials: "include"});
                const data = await res.json();
                setOverallLikes(data.amount);
            } catch (error) {
                console.error('Error fetching the like count:', error);
            }
        }
        getLikes();
    }, []);

    return (
        <div className="row mt-4">
            <div className="col-md-4">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Total Counts</h5>
                        <p className="card-text">{overallCounts}</p>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Total Likes</h5>
                        <p className="card-text">{overallLikes}</p>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Your Profile</h5>
                        <p className="card-text">Username: {profile.username}</p>
                        <p className="card-text">Email: {profile.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
