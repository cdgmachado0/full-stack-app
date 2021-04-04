const express = require('express');
const { User, Course } = require('./models');
const router = express.Router();
const bcrypt = require('bcrypt');

//Requires the middleware helpers
const {
    asyncHandler, 
    authenticateUser, 
    getNextId,
    processSequelizeError,
    isOwner
} = require('./middleware/helper-func');


//Gets the current authenticated user
router.get('/users', authenticateUser, (req, res) => {
    const user = req.currentUser;
    res.json({
        id: `${user.id}`,
        name: `${user.firstName} ${user.lastName}`,
        email: user.emailAddress
    });
});

//Creates a new user
router.post('/users', asyncHandler(async (req, res) => {
    try {
        const nextId = await getNextId(User);
        req.body.id = nextId;
        await User.create(req.body);
        res.status(201).location('/').json({
            id: req.body.id,
            name: `${req.body.firstName} ${req.body.lastName}`,
            email: req.body.emailAddress
        });
    } catch(error) {
        processSequelizeError(error, res);
    }
}));

//Gets a list of all courses along their users
router.get('/courses', asyncHandler(async (req, res) => {
    const courses = await Course.findAll({
        attributes: ['id', 'title', 'description', 'estimatedTime', 'materialsNeeded'],
        include: {
            model: User,
            as: 'Student',
            attributes: ['id', 'firstName', 'lastName']
        }
    });
    res.json({ courses });
}));

//Gets a specific course along its user
router.get('/courses/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const course = await Course.findOne({
        where: { id },
        attributes: ['id', 'title', 'description', 'estimatedTime', 'materialsNeeded'],
        include: {
            model: User,
            as: 'Student',
            attributes: ['id', 'firstName', 'lastName']
        }
    });
    if (course) {
        res.json({ course });
    } else {
        res.status(400).json({ message: 'Course not found in database' });
    }
}));

//Creates a new course
router.post('/courses', authenticateUser, asyncHandler(async (req, res) => { 
    try {
        delete req.body.isAuthenticated;
        const nextId = await getNextId(Course);
        req.body.id = nextId;
        const userName = req.body.userId.split(/\s/);
        const userId = await User.findOne({
            attributes: [ 'id' ],
            where: {
                firstName: userName[0],
                lastName: userName[1]
            }
        });
        req.body.userId = userId.dataValues.id;
        await Course.create(req.body);
        res.status(201).location(`/courses/${nextId}`).end();
    } catch(error) {
        processSequelizeError(error, res);
    }
}));

//Updates an existing course 
router.put('/courses/:id', authenticateUser, isOwner, asyncHandler(async (req, res) => {
    try {
        delete req.body.isAuthenticated;
        const course = await Course.findByPk(req.params.id);
        await course.update(req.body);
        res.status(204).end();
    } catch(error) {
        processSequelizeError(error, res);
    }
}));

//Deletes an existing course
router.delete('/courses/:id', authenticateUser, isOwner, asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id);
    await course.destroy();
    res.status(204).end();
}));

module.exports = router;



