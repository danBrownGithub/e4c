
const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
const app = express();
const port = 8080;
require('./connections/mongo.js')
//const {Db} = require('mongodb').Db;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send("Welcome to E4C's API! You seem lost...")
});

//-----------------Classroom Logic------------------------------------
//Creates a new class room and updates owners profile
app.put('/classroom', async (req,res)=> {
    let userAuth = await e4c.collection("tokens").findOne({'_id':new ObjectId(req.body.tokenID)});
    if (userAuth == null) {
        res.status(400).send("Invalid Token");
    }
    else {
        const classroom = {"owner":req.body.owner,
            "classroomName": req.body.classroomName,
            "member":[req.body.member]};
        const returnedClassroom = await e4c.collection("classes").insertOne(classroom);
        const query = {'_id':new ObjectId(req.body.id)};
        const updateUser = {$push: {"class":returnedClassroom.insertedId}};
        const updatedUser = await e4c.collection("usr").updateOne(query,updateUser);

        if (updatedUser != null) {
            res.status(200).send(returnedClassroom.insertedId);
            console.log(updatedUser);
        }
        else {
            res.status(400).send("Something went wrong :/");
        }
    }

})

//Gets a classroom as long as requester is a member
app.get('/classroom',async(req,res) => {
    let userAuth = await e4c.collection("tokens").findOne({'_id':new ObjectId(req.body.tokenID)});
    if (userAuth != null) {
        const classroom = await e4c.collection("classes").findOne({"_id":new ObjectId(req.body.classID)})
        let isMember=false;
        if (classroom != null) {
            for (let i = 0; i < classroom.member.length; i++) {
                if (classroom.member[i] === req.body.id) {
                    isMember=true;
                    break;
                }
            }
        }
        if (isMember)
            res.status(200).send(classroom);
        else 
            res.status(400).send("Error");
    }
    else {
        res.status(400).send("Invalid Token");
    }
})

//Deletes a classroom only if requester is owner
app.delete('/classroom',async(req,res) => {
    let userAuth = await e4c.collection("tokens").findOne({'_id':new ObjectId(req.body.tokenID)});
    if (userAuth != null) {
        const classroom = await e4c.collection("classes").findOne({"_id":new ObjectId(req.body.classID)})    
        if (classroom.owner === req.body.id){
            const result = await e4c.collection("classes").deleteOne(classroom);
            res.status(200).send(result.deletedCount);
        }
        else
            res.status(400).send("Error");
    }
    else {
        res.status(400).send("Invalid Token");
    }
})

//Adds User to Classroom
app.put('/classroom/usr', async(req,res)=> {
    let userAuth = await e4c.collection("tokens").findOne({'_id':new ObjectId(req.body.tokenID)});
    let userPresent = await e4c.collection("usr").findOne({'email': req.body.email});
    if (userAuth != null) {
        const query = {'_id':userPresent._id};
        const updateUser = {$push: {"class":req.body.classID}};
        const updatedUser = await e4c.collection("usr").updateOne(query,updateUser);

        const classQuery = {'_id':new ObjectId(req.body.classID)};
        const updateClass = {$push: {"member":userPresent._id.toString()}}
        const updatedClass = await e4c.collection("classes").updateOne(classQuery,updateClass);

        if (updatedUser != null && updatedClass != null) {
            res.status(200).send();
        }
        else {
            res.status(400).send("Something went wrong :/");
        }
    }
    else {
        res.status(400).send("Invalid Token");
    }
})

//Deletes User From Classroom
app.delete('/classroom/usr', async(req,res)=> {
    let userAuth = await e4c.collection("tokens").findOne({'_id':new ObjectId(req.body.tokenID)});
    let userPresent = await e4c.collection("usr").findOne({'email': req.body.email});
    if (userAuth != null) {
        const query = {'_id':userPresent._id};
        const updateUser = {$pull: {"class":req.body.classID}};
        const updatedUser = await e4c.collection("usr").updateOne(query,updateUser);

        if (updatedUser != null) {
            res.status(200).send();
        }
        else {
            res.status(400).send("Something went wrong :/");
        }
    }
    else {
        res.status(400).send("Invalid Token");
    }
})

//-----------------Class Section Logic------------------------------------
//Creates a Classroom
app.put('/classroom/section', async (req,res)=> {
    let userAuth = await e4c.collection("tokens").findOne({'_id':new ObjectId(req.body.tokenID)});
    if (userAuth == null) {
        res.status(400).send("Invalid Token");
    }
    else {
        const section = {"owner":req.body.owner,
            "sectionName": req.body.sectionName,
            "member":[req.body.member],
            "groups":[req.body.groups]};
        const returnedSection = await e4c.collection("sections").insertOne(section);
        const query = {'_id':new ObjectId(req.body.id)};
        const updateUser = {$push: {"sections":returnedSection.insertedId}};
        const updatedUser = await e4c.collection("usr").updateOne(query,updateUser);

        if (updatedUser != null) {
            res.status(200).send(returnedSection.insertedId);
            console.log(updatedUser);
        }
        else {
            res.status(400).send("Something went wrong :/");
        }
    }
})

//Gets a classroom as long as requester is a member
app.get('/classroom/section',async(req,res) => {
    let userAuth = await e4c.collection("tokens").findOne({'_id':new ObjectId(req.body.tokenID)});
    if (userAuth != null) {
        const section = await e4c.collection("sections").findOne({"_id":new ObjectId(req.body.classID)})
        let isMember=false;
        if (section != null)
        {
            for (let i=0;i<section.member.length;i++) {
                if (section.member[i]===req.body.id){
                    isMember=true;
                    break;
                }
            }
        }
        if (isMember)
            res.status(200).send(section);
        else 
            res.status(400).send("Error");
    }
    else {
        res.status(400).send("Invalid Token");
    }
})

//Deletes a classroom only if requester is owner
app.delete('/classroom/section',async(req,res) => {
    let userAuth = await e4c.collection("tokens").findOne({'_id':new ObjectId(req.body.tokenID)});
    if (userAuth != null) {
        const section = await e4c.collection("sections").findOne({"_id":new ObjectId(req.body.classID)})
        if (section.owner._id.toString() === req.body.id) {
            const result = await e4c.collection("sections").deleteOne(section);
            res.status(200).send(result.deletedCount);
        }
        else
            res.status(400).send("Error");
    }
    else {
        res.status(400).send("Invalid Token");
    }
})

//-----------------Class Section User Logic------------------------------------
//Adds User to Class Section
app.put('/classroom/section/usr', async(req,res)=> {
    let userAuth = await e4c.collection("tokens").findOne({'_id':new ObjectId(req.body.tokenID)});
    let userPresent = await e4c.collection("usr").findOne({'email': req.body.email});
    if (userAuth != null) {
        const query = {'_id':userPresent._id};
        const updateUser = {$push: {"sections":req.body.classID}};
        const updatedUser = await e4c.collection("usr").updateOne(query,updateUser);

        const sectionQuery = {'_id':new ObjectId(req.body.classID)};
        const updateSection = {$push: {"member":userPresent._id.toString()}}
        const updatedSection = await e4c.collection("sections").updateOne(sectionQuery,updateSection);

        if (updatedUser != null && updatedSection != null) {
            res.status(200).send();
        }
        else {
            res.status(400).send("Something went wrong :/");
        }
    }
    else {
        res.status(400).send("Invalid Token");
    }
})

//Deletes User From Class Section
app.delete('/classroom/section/usr', async(req,res)=> {
    let userAuth = await e4c.collection("tokens").findOne({'_id':new ObjectId(req.body.tokenID)});
    let userPresent = await e4c.collection("usr").findOne({'email': req.body.email});
    if (userAuth != null) {
        const query = {'_id':userPresent._id};
        const updateUser = {$pull: {"sections":req.body.classID}};
        const updatedUser = await e4c.collection("usr").updateOne(query,updateUser);

        if (updatedUser != null) {
            res.status(200).send();
        }
        else {
            res.status(400).send("Something went wrong :/");
        }
    }
    else {
        res.status(400).send("Invalid Token");
    }
})

//-----------------User ID------------------------------------

app.post('/usr/id', async (req,res) => {
    let userInfo = await e4c.collection("usr").findOne({'_id':new ObjectId(req.body.id)});
    let userAuth = await e4c.collection("tokens").findOne({'_id':new ObjectId(req.body.tokenID)});
    if (userInfo == null || userAuth == null) {
        res.status(400).send({
            message: 'No such user found. Is user id correct?'
        })
    }
    else {
        res.status(200).send(userInfo);
        
    }
});

//-----------------Class Group Logic------------------------------------
//Creates Class Group
app.put('/classroom/group', async (req,res)=> {
    let userAuth = await e4c.collection("tokens").findOne({'_id':new ObjectId(req.body.tokenID)});
    if (userAuth == null) {
        res.status(400).send("Invalid Token");
    }
    else {
        const group = {"owner":req.body.owner,
            "groupName": req.body.groupName,
            "member":[req.body.member]};
        const returnedGroup = await e4c.collection("groups").insertOne(group);
        const query = {'_id':new ObjectId(req.body.id)};
        const updateUser = {$push: {"group":returnedGroup.insertedId}};
        const updatedUser = await e4c.collection("usr").updateOne(query,updateUser);

        if (updatedUser != null) {
            res.status(200).send(returnedGroup.insertedId);
            console.log(updatedUser);
        }
        else {
            res.status(400).send("Something went wrong :/");
        }
    }
})

//Returns Class Group
app.get('/classroom/group',async(req,res) => {
    let userAuth = await e4c.collection("tokens").findOne({'_id':new ObjectId(req.body.tokenID)});
    if (userAuth!=null) {
        const group = await e4c.collection("groups").findOne({"_id":new ObjectId(req.body.groupID)})
        let isMember=false;
        if (group != null) {
            for (let i = 0; i < group.member.length; i++) {
                if (group.member[i] === req.body.id) {
                    isMember=true;
                    break;
                }
            }
        }
        if (isMember)
            res.status(200).send(group);
        else
            res.status(400).send("Error");
    }
    else {
        res.status(400).send("Invalid Token");
    }
})

//Deletes Class Group
app.delete('/classroom/group',async(req,res) => {
    let userAuth = await e4c.collection("tokens").findOne({'_id':new ObjectId(req.body.tokenID)});
    if (userAuth!=null) {
        const group = await e4c.collection("groups").findOne({"_id":new ObjectId(req.body.groupID)})
        if (group.owner === req.body.id) {
            const result = await e4c.collection("groups").deleteOne(group);
            res.status(200).send(result);
        }
        else
            res.status(400).send("Error");
    }
    else {
        res.status(400).send("Invalid Token");
    }
})

//-----------------Class Group User Logic------------------------------------
//Adds User to Class Group
app.put('/classroom/group/usr', async(req,res)=> {
    let userAuth = await e4c.collection("tokens").findOne({'_id':new ObjectId(req.body.tokenID)});
    let userPresent = await e4c.collection("usr").findOne({'email': req.body.email});
    if (userAuth != null) {
        const query = {'_id':userPresent._id};
        const updateUser = {$push: {"groups":req.body.groupID}};
        const updatedUser = await e4c.collection("usr").updateOne(query,updateUser);

        const groupQuery = {'_id':new ObjectId(req.body.groupID)};
        const updateGroups = {$push: {"member":userPresent._id.toString()}}
        const updatedGroup = await e4c.collection("groups").updateOne(groupQuery,updateGroups);

        if (updatedUser != null && updatedGroup != null) {
            res.status(200).send();
        }
        else {
            res.status(400).send("Something went wrong :/");
        }
    }
    else {
        res.status(400).send("Invalid Token");
    }
})

//Deletes User From Class Group
app.delete('/classroom/group/usr', async(req,res)=> {
    let userAuth = await e4c.collection("tokens").findOne({'_id':new ObjectId(req.body.tokenID)});
    let userPresent = await e4c.collection("usr").findOne({'email': req.body.email});
    if (userAuth != null) {
        const query = {'_id':userPresent._id};
        const updateUser = {$pull: {"groups":req.body.groupID}};
        const updatedUser = await e4c.collection("usr").updateOne(query,updateUser);

        if (updatedUser != null) {
            res.status(200).send();
        }
        else {
            res.status(400).send("Something went wrong :/");
        }
    }
    else {
        res.status(400).send("Invalid Token");
    }
})

//-----------------Activity Logic------------------------------------
//Creates Activity
app.put('/activity', async (req, res) => {
    let userAuth = await e4c.collection("tokens").findOne({'_id':new ObjectId(req.body.tokenID)});
    if (userAuth == null) {
        res.status(400).send("Invalid Token");
    }
    else {
        const activity = {"_id":req.body.id,
            "name": req.body.name,
            "description": req.body.description};
        const returnedActivity = await e4c.collection("activities").insertOne(activity);
        const query = {'_id':new ObjectId(req.body.id)};
        const updateUser = {$push: {"_id":returnedActivity.insertedId}};
        const updatedUser = await e4c.collection("activities").updateOne(query,updateUser);

        if (returnedActivity != null) {
            res.status(200).send(returnedActivity.insertedId);
            console.log(updatedUser);
        }
        else {
            res.status(400).send("Something went wrong");
        }
    }
})

//Returns Activity Information
app.get('/activity', async (req, res) => {
    let userAuth = await e4c.collection("tokens").findOne({'_id':new ObjectId(req.body.tokenID)});
    if (userAuth != null) {
        const activity = await e4c.collection("activities").findOne({"_id":new ObjectId(req.body.id)})
        res.status(200).send(activity);
    }
    else {
        res.status(400).send("Invalid Token");
    }
})

//Deletes Activity
app.delete('/activity', async (req, res) => {
    let userAuth = await e4c.collection("tokens").findOne({'_id':new ObjectId(req.body.tokenID)});
    if (userAuth != null) {
        const activity = await e4c.collection("activities").findOne({"_id":new ObjectId(req.body.id)})
        if (activity != null) {
            const result = await e4c.collection("activities").deleteOne(activity);
            res.status(200).send(result);
        }
        else
            res.status(400).send("Error");
    }
    else {
        res.status(400).send("Invalid Token");
    }
})

//-----------------User Group Logic------------------------------------

app.post('/usr/id/group', async (req,res) => {
    const groups = req.body.group;
    const loopLimit = Object.keys(groups).length;
    const groupResult = [];
    for (let i = 0; i < loopLimit; i++) {
        groups[i] = new ObjectId(groups[i])
    }

    for (let i = 0; i < loopLimit; i++) {
        let tempReturn = await e4c.collection("groups").findOne({'_id':groups[i]});
        groupResult.push(tempReturn);
    }
    let userAuth = await e4c.collection("tokens").findOne({'_id':new ObjectId(req.body.tokenID)});
    if (groupResult.length == 0 || userAuth == null) {
        res.status(400).send({
            message: 'No such groups found. Is user id correct?'
        })
    }
    else {
        groupResult.forEach(element => {
           console.log(element); 
        });
        res.status(200).send(groupResult);
    }
});

//-----------------User Section Logic------------------------------------

app.post('/usr/id/section', async (req,res) => {
    const sections = req.body.section;
    const loopLimit = Object.keys(sections).length;
    const sectionResult = [];
    for (let i = 0; i < loopLimit; i++) {
        sections[i] = new ObjectId(sections[i])
    }

    for (let i = 0; i < loopLimit; i++) {
        let tempReturn = await e4c.collection("sections").findOne({'_id':sections[i]});
        sectionResult.push(tempReturn);
    }
    let userAuth = await e4c.collection("tokens").findOne({'_id':new ObjectId(req.body.tokenID)});
    if (sectionResult.length == 0 || userAuth == null) {
        res.status(400).send({
            message: 'No such sections found. Is user id correct?'
        })
    }
    else {
        sectionResult.forEach(element => {
            console.log(element);
        });
        res.status(200).send(sectionResult);
    }
});

//-----------------User Class Logic------------------------------------

app.post('/usr/id/class', async (req,res) => {
    let userAuth = await e4c.collection("tokens").findOne({'_id':new ObjectId(req.body.tokenID)});
    const classes = req.body.classes;
    const loopLimit = Object.keys(classes).length;
    const classResult = [];
    console.log(classes);
    for (let i = 0; i < loopLimit; i++) {
        classes[i] = new ObjectId(classes[i])
    }

    for (let i = 0; i < loopLimit; i++) {
        let tempReturn = await e4c.collection("classes").findOne({'_id':classes[i]});
        classResult.push(tempReturn);
    }
    console.log(classResult);
    if (classResult.length == 0 || userAuth == null) {
        res.status(400).send({
            message: 'No such classes found. Is user id correct?'
        })
    }
    else {
        res.status(200).send(classResult).send();
    }
});

//-----------------Login Logic------------------------------------
app.post('/login', async (req,res) => {
    let userPresent = await e4c.collection("usr").findOne({'email': req.body.email});
    if (userPresent == null) {
        res.status(400).send({
            message: 'No such user'
        });
    }
    else if (userPresent.pass != req.body.password) {
        res.status(400).send({
            message: 'No such user'
        });
    }
    else {
        res.status(200);
        res.json({"_id":userPresent._id.toString(),"token":"62360e0a76896f6bd0fa1fb5","success":true}).send();
    }
});

//-----------------Account Creation Logic------------------------------------
app.put('/acct-creation', async (req,res) => {
    let userPresent = await e4c.collection("usr").findOne({'email': req.body.email});
    if (userPresent != null) {
        res.status(400).send("Already in use")
    }
    else {
        const user = {"email": req.body.email,
            "name": req.body.name,
            "lname": req.body.lname,
            "class":[],"section":[],"group":[],
            "password":req.body.password};
        const result = await e4c.collection("usr").insertOne(user);
        console.log(`success: ${result.insertedId}`)
        res.status(200).send("success");
    }
});

//-----------------Logout Logic------------------------------------
app.post('/logout',(req,res) => {
    res.status(200).send();
});

app.listen(port, () => {
    console.log(`live on ${port}`)
});