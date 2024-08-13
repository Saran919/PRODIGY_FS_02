import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeForm = ({ employee, onSave }) => {
    const [name, setName] = useState(employee ? employee.name : '');
    const [position, setPosition] = useState(employee ? employee.position : '');
    const [department, setDepartment] = useState(employee ? employee.department : '');
    const [email, setEmail] = useState(employee ? employee.email : '');
    const [phone, setPhone] = useState(employee ? employee.phone : '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { name, position, department, email, phone };
        try {
            if (employee) {
                await axios.put(`/api/employees/${employee._id}`, data);
            } else {
                await axios.post('/api/employees', data);
            }
            onSave();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} placeholder="Position" />
            <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Department" />
            <input type="
