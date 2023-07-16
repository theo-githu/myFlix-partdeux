
import { Row, Col, Button } from "react-bootstrap";

export const DeleteUser = ({ token, user }) => {
    const deleteAccount = () => {
        const userWarning = confirm (`Please be aware that once your account is deleted, all information will be lost. Do you wish to continue?`);

        userWarning === false 
        ? alert('Part of the ship, part of the crew!')
        : fetch (`https://movieflix-899d9c6c8969.herokuapp.com/users/${user.Username}`, {
            method: 'DELETE',
            headers: { 
                Authorization: `Bearer ${storedToken}`,
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if (response.ok) {
                alert('User profile successfully deleted.');
                localStorage.clear();
                window.location.reload();
            } else {
                alert('Something went wrong! Please try again.');
            }
        });    
    };

    return (
        <Col>
            <div>
                <Button 
                onClick={() => deleteAccount(user)}
                className = 'button-delete'
                type = 'submit'
                variant = 'danger'
                >
                    Delete Profile
                </Button>
            </div>
        </Col>
    );
};

