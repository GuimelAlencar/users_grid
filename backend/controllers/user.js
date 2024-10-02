import {db} from "../db.js"

export const getUsers = (req,res) => {

    const q = "SELECT * FROM users";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data)
    });
};

export const addUser = (req, res) => {
    const q = "INSERT INTO users(`userName`,`email`,`phone`,`birthDate`) VALUES(?)";

    const values = [
        req.body.userName,
        req.body.email,
        req.body.phone,
        req.body.birthDate,
    ];

    db.query(q, [values], (err) => {
        if (err) return res.json(err);
        return res.status(200).json("User successfully created!")
    });
};

export const updateUser = (req, res) => {
    const q = "UPDATE users SET `userName` = ?, `email` = ?, `phone` = ?, `birthDate` = ? WHERE `id` = ?";
    
    const values = [
        req.body.userName,
        req.body.email,
        req.body.phone,
        req.body.birthDate,
    ];

    db.query(q, [...values, req.params.id], (err) => {
        if (err) return res.json(err);
        return res.status(200).json("User successfully updated!")
    });
};

export const deleteUser = (req, res) => {
    const q = "DELETE FROM users WHERE `id` = ?";

    db.query(q, [req.params.id], (err) => {
        if (err) return res.json(err);
        return res.status(200).json("User successfully Deleted!")
    });
};
