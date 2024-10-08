import axios from "axios";
import React, {useRef, useEffect} from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
    display: flex;
    alighn-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Label = styled.label``;

const Button = styled.label`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;

`;


const Form = ({ getUsers, onEdit, setOnEdit }) => {

    const ref = useRef();

    useEffect(() => {
        if(onEdit) {
            const user = ref.current;

            user.username.value = onEdit.username;
            user.email.value = onEdit.email;
            user.phone.value = onEdit.phone;
            user.birthDate.value = onEdit.birthDate;                        
        };
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;

        if (
            !user.username.value ||
            !user.mail.value ||
            !user.phone.value ||
            !user.birthDate.value
        ) {
            return toast.warn("Filling in all fields is mandatory!");
        }

        if (onEdit) {
            await axios
                .put("http://localhost:3000/" + onEdit.id, {
                    userName: user.userName.value,
                    email: user.email.value,
                    phone: user.phone.value,
                    birthDate: user.birtDate.value
                })
                .then(({ data }) => toast.sucess(data))
                .then(({ data }) => toast.error(data));
        } else {
            await axios
                .post("http://localhost:3000/", {
                    userName: user.userName.value,
                    email: user.email.value,
                    phone: user.phone.value,
                    birthDate: user.birtDate.value
                })
                .then(({ data }) => toast.sucess(data))
                .then(({ data }) => toast.error(data));
        }

        user.username.value = "";
        user.mail.value = "";
        user.phone.value = "";
        user.birthDate.value = "";

        setOnEdit(null);
        getUsers();
    };
    
    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Name</Label>
                <Input name="nome" />
            </InputArea>
            <InputArea>
                <Label>Email</Label>
                <Input name="email" type="email" />
            </InputArea>
            <InputArea>
                <Label>Phone</Label>
                <Input name="phone" />
            </InputArea>
            <InputArea>
                <Label>Birth Date</Label>
                <Input name="birth_date" type="date" />
            </InputArea>
            <Button type="submit">Salvar</Button>
        </FormContainer>
    );
};

export default Form;