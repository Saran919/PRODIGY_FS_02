const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const Joi = require('joi');
const authMiddleware = require('../middleware/authMiddleware');

// Validation schema
const employeeSchema = Joi.object({
    name: Joi.string().required(),
    position: Joi.string().required(),
    department: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
});

// CRUD operations
router.post('/', authMiddleware, async (req, res) => {
    const { error } = employeeSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).send(employee);
});

router.get('/', authMiddleware, async (req, res) => {
    const employees = await Employee.find();
    res.send(employees);
});

router.get('/:id', authMiddleware, async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).send('Employee not found.');
    res.send(employee);
});

router.put('/:id', authMiddleware, async (req, res) => {
    const { error } = employeeSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!employee) return res.status(404).send('Employee not found.');
    res.send(employee);
});

router.delete('/:id', authMiddleware, async (req, res) => {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).send('Employee not found.');
    res.send(employee);
});

module.exports = router;
