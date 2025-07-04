import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Employee from './models/Employee.js';

const app = express();


app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://venu:venu%402123@cluster0.kdhtq4a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/employee_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Routes
app.get('/employees', async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

app.post('/employees', async (req, res) => {
  const newEmp = new Employee(req.body);
  await newEmp.save();
  res.json({ message: 'Employee added' });
});

app.delete('/employees/:id', async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: 'Employee deleted' });
});

app.listen(5000, '0.0.0.0', () => {
  console.log("Server running...");
});

