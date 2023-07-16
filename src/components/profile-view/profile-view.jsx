
import React, { useEffect, useState } from 'react'; 

import { FavouriteMovies } from './favourite-movies';
import { UserInfo } from './user-info';
import { DeleteUser } from './delete-user';
import { UpdateUser } from './update-user'
import { Container } from 'react-bootstrap';

export const ProfileView = ({ user }) => {
    const storedToken = localStorage.getItem('token');
    const [token] = useState(storedToken ? storedToken : null);

    const [favouriteMovies, setFavouriteMovies] = useState([]);

    const getUser = (token) => {
        fetch(`https://movieflix-899d9c6c8969.herokuapp.com/users/${user.Username}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`},
        })
        .then((response) => response.json())
        .then((response) => {
            setFavouriteMovies(response.FavouriteMovies);
        });
    };

    useEffect(() => {
        getUser(token);
    }, []);

    return (
        <Container>
            <UserInfo token={token} user={user} />
            <FavouriteMovies favMovies={favouriteMovies} user={user} />
            <UpdateUser token={token} user={user}/>
            <DeleteUser token={token} user={user}/>
        </Container>
    );
};