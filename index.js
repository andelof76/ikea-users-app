// imports the express npm module
const express = require("express");
// imports the cors npm module
const cors = require("cors");
// import the sequelize npm module
const { Sequelize, Model, DataTypes } = require('sequelize');
// Creates a new instance of express for our app
const app = express();

// Create Sequelize instance
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

const users = [
    { name: "John Doe", isAdmin: false, favourite_beer: "pripps" },
    { name: "Jane Smith", isAdmin: false, favourite_beer: "lagunitas" },
    { name: "Mike Johnson", isAdmin: false, favourite_beer: "sierra nevada"  },
    { name: "Sarah Williams", isAdmin: false, favourite_beer: "Falcon"  },
    { name: "David Brown", isAdmin: false, favourite_beer: "lagge"  }
];

const managers = [
    { name: "John Mc", isManager: true, favourite_employee: "lofs" },
    { name: "Jane cat", isManager: true, favourite_employee: "xile" },
    { name: "Mike Elofsson", isManager: true, favourite_employee: "zero"  },
    { name: "Sarah Eliasson", isManager: true, favourite_employee: "magub"  },
    { name: "David Albertsson", isManager: true, favourite_employee: "rufab"  }
];
// Define User model
class User extends Model {}
User.init({
    name: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    favourite_beer: DataTypes.STRING,
}, { sequelize, modelName: 'user' });

// Define Manager model
class Manager extends Model {}
Manager.init({
    name: DataTypes.STRING,
    isManager: DataTypes.BOOLEAN,
    favourite_employee: DataTypes.STRING,
}, { sequelize, modelName: 'manager' });

// Sync models with database
//sequelize.sync();
sequelize.sync({force: true});

// .use is middleware - something that occurs between the request and response cycle.
app.use(cors());
 // We will be using JSON objects to communcate with our backend, no HTML pages.
app.use(express.json());
// This will serve the React build when we deploy our app
app.use(express.static("react-frontend/dist"));

// This route will return 'Hello Ikea!' when you go to localhost:8080/ in the browser
app.get("/", (req, res) => {
    res.json({ data: 'Hello Ikea!' });
});
app.get('/api/seeds', async (req, res) => {
    users.forEach(u => User.create(u));
    res.json(users);
});
app.get('/api/seeds1', async (req, res) => {
    managers.forEach(m => Manager.create(m));
    res.json(managers);
});
app.get('/api/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});
app.get("/api/managers", async (req, res) => {
    const managers = await Manager.findAll();
    res.json(managers);
});
app.get("/api/users/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id);
    res.json(user);
});
app.get("/api/managers/:id", async (req, res) => {
    const manager = await Manager.findByPk(req.params.id);
    res.json(manager);
});
app.post('/api/users', async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
});
app.post('/api/managers', async (req, res) => {
    const manager = await Manager.create(req.body);
    res.json(manager);
});
app.put("/api/users/:id", async (req, res) => {
    const { name, isAdmin, favourite_beer } = req.body;

    const user = await User.findByPk(req.params.id);
    await user.update({ name, isAdmin, favourite_beer });
    await user.save();
    res.json(user);
});
app.put("/api/managers/:id", async (req, res) => {
    const { name, isManager, favourite_employee } = req.body;

    const manager = await Manager.findByPk(req.params.id);
    await manager.update({ name, isManager, favourite_employee });
    await manager.save();
    res.json(manager);
});
app.delete('/api/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.json({data: `The user with id of ${req.params.id} is removed.`});
});
app.delete('/api/managers/:id', async (req, res) => {
    const manager = await Manager.findByPk(req.params.id);
    await manager.destroy();
    res.json({data: `The manager with id of ${req.params.id} is removed.`});
});



// This tells the express application to listen for requests on port 8080
const port = process.env.PORT || 8080;
app.listen(port, async () => {
    console.log(`Server started at ${port}`);
});