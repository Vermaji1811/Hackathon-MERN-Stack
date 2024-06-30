const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mern-auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Define schemas and models
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  contact: String,
  community: String,
  description: String,
});

const User = mongoose.model('User', userSchema);

const eventSchema = new mongoose.Schema({
  typeOfEvent: String,
  placeOfEvent: String,
  nameOfEvent: String,
  dateOfEvent: Date,
  volunteerNeeded: Boolean,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Event = mongoose.model('Event', eventSchema);

// Middleware to verify JWT token
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send('Access Denied');
  }

  try {
    const verified = jwt.verify(token, 'secret');
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { name, email, password, contact, community } = req.body;

  // Password hashing
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    contact,
    community,
  });

  try {
    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error('Error registering user:', error.message);
    if (error.code === 11000) {
      res.status(400).send('Email already exists');
    } else {
      res.status(400).send('Error registering user');
    }
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Create event endpoint
app.post('/events', authenticate, async (req, res) => {
  const { typeOfEvent, placeOfEvent, nameOfEvent, dateOfEvent, volunteerNeeded } = req.body;

  const newEvent = new Event({
    typeOfEvent,
    placeOfEvent,
    nameOfEvent,
    dateOfEvent,
    volunteerNeeded,
    createdBy: req.user.id,
  });

  try {
    await newEvent.save();
    console.log('Event created successfully:', newEvent); 
    res.status(201).json(newEvent); 
  } catch (error) {
    console.error('Error creating event:', error.message);
    res.status(400).send('Error creating event');
  }
});

// Get all events endpoint excluding events created by the logged-in user
app.get('/events', authenticate, async (req, res) => {
  try {
    const events = await Event.find({ createdBy: { $ne: req.user.id } }) 
      .populate('createdBy', 'name email')
      .populate('volunteers', 'name email');

    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error.message);
    res.status(500).send('Server error');
  }
});

// Volunteer for an event endpoint
app.post('/events/:id/volunteer', authenticate, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send('Event not found');
    }

    if (event.volunteers.includes(req.user.id)) {
      return res.status(400).send('User already volunteered');
    }

    event.volunteers.push(req.user.id);
    await event.save();
    res.status(200).send('Volunteered successfully');
  } catch (error) {
    console.error('Error volunteering for event:', error.message);
    res.status(500).send('Server error');
  }
});

// Profile endpoint
app.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get users by community endpoint
app.get('/community', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const communityMembers = await User.find({ community: user.community }).sort({ name: 1 }).select('name email');
    res.json(communityMembers);
  } catch (error) {
    console.error('Error fetching community members:', error.message);
    res.status(500).send('Server error');
  }
});

// Update profile endpoint
app.put('/profile', authenticate, async (req, res) => {
  const { name, email, contact, community, description } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, contact, community, description },
      { new: true, runValidators: true, context: 'query' }
    ).select('-password');

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error.message);
    if (error.code === 11000) {
      res.status(400).send('Email already exists');
    } else {
      res.status(500).send('Server error');
    }
  }
});

// Get events created by the logged-in user with volunteer details
app.get('/events/created', authenticate, async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user.id }).populate('volunteers', 'name email community');
    res.json(events);
  } catch (error) {
    console.error('Error fetching user-created events:', error.message);
    res.status(500).send('Server error');
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('name email community');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).send('Server error');
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});