const express = require("express");
const app = express();
const fs = require("fs");
//body parser midleware
app.use(express.json());
let data = fs.readFileSync(`${__dirname}/data.json`);
let profiles = JSON.parse(data);
// get all profiles

app.get("/profiles", (req, res) => {
  res.status(200).json({
    message: "success",
    data: profiles,
  });
});
// get one profile
app.get("/profiles/:id", (req, res) => {
  const idRequest = req.params.id * 1;

  const targetProfile = profiles.find((el) => el.id === idRequest);
  res.status(200).json({
    message: "succss",
    data: targetProfile,
  });
});
// create
app.post("/profiles", (req, res) => {
  const newObject = req.body;
  const newId = profiles.length - 1 + 1;
  const newProfile = Object.assign({ id: newId }, newObject);
  profiles.push(newProfile);
  fs.writeFile(`${__dirname}/data.json`, JSON.stringify(profiles), (err) => {
    res.status(201).json({
      message: "created successfully",
      data: {
        newProfile: newProfile,
      },
    });
  });
});

// update

// delete
app.delete("/profiles/:id", (req, res) => {
  const id = req.params.id*1;
  const filteredProfiles = profiles.filter((el) => el.id === id);
  console.log(id)
  console.log(filteredProfiles)
  fs.writeFile(
    `${__dirname}/data.json`,
    JSON.stringify(filteredProfiles),
    (err) => {
      res.status(200).json({
        message: "successful deleted",
        data: filteredProfiles,
      });
    }
  );
});
// servers
const port = 8000;

app.listen(port, () =>
  console.log(`Your server is running on the port ${port}`)
);
console.log("hello world");
