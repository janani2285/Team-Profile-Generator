const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//Variables to store engineer, manager and intern objects
let engineerArr = [];
let manager = {}
let internArr = [];

renderQuestions();

//Function to render questions to add team members
function renderTeamMembersQuestion() {

    const answers = inquirer.prompt([
        {
            type: "list",
            message: "Which type of team member would you like to add?",
            name: "teamMember",
            choices: [
                "Engineer",
                "Intern",
                "I don't want to add anymore team member",
            ]
        }
    ]).then(function (answers) {
        
        if (answers.teamMember === "Engineer") {
            renderEngineerQuestions();
        } else if (answers.teamMember === "Intern") {
            renderInternQuestions();
        } else {
            renderHtml();
        }
    });
}

//Function to render questions for engineers
function renderEngineerQuestions() {
    const answers = inquirer.prompt([
        {
            type: "input",
            message: "What is your Engineer's name?",
            name: "engineerName"
        },
        {
            type: "input",
            message: "What is your Engineer's id?",
            name: "engineerId"
        },
        {
            type: "input",
            message: "What is your Engineer's email id?",
            name: "engineerEmailId"
        },
        {
            type: "input",
            message: "What is your Engineer's github username?",
            name: "engineerGitHub"
        }

    ]).then(function (answers) {
        engineerArr.push(new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmailId, answers.engineerGitHub));
        renderTeamMembersQuestion();
    });
}

//Function to render questions for interns
function renderInternQuestions() {
    const answers = inquirer.prompt([
        {
            type: "input",
            message: "What is your Intern's name?",
            name: "internName"
        },
        {
            type: "input",
            message: "What is your Intern's id?",
            name: "internId"
        },
        {
            type: "input",
            message: "What is your Intern's email id?",
            name: "internEmailId"
        },
        {
            type: "input",
            message: "What is your Intern's school?",
            name: "internSchool"
        }

    ]).then(function (answers) {
        internArr.push(new Intern(answers.internName, answers.internId, answers.internEmailId, answers.internSchool));
        renderTeamMembersQuestion();
    });
}

//Function to render HTML and write into team.html file
function renderHtml() {
    const employeeArr = [manager, ...engineerArr, ...internArr];
    const html = render(employeeArr);

    //checking if the output directory is exsists or not
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }

    //writing to file
    fs.writeFile(outputPath, html, function (error) {
        // if an error occurs, log it
        if (error) {
            // stop execution if there is an error
            console.log(error)
            return console.log(error);
        }
        // finished writing to file
        console.log("Success! Team Profile Generated");

    });
}

//Function to render questions for manager
function renderQuestions() {

    console.log("Please build your team");
    const answers = inquirer.prompt([
        {
            type: "input",
            message: "What is your Manager's name?",
            name: "managerName"
        },
        {
            type: "input",
            message: "What is your Manager's id?",
            name: "managerId"
        },
        {
            type: "input",
            message: "What is your Manager's email id?",
            name: "managerEmailId"
        },
        {
            type: "input",
            message: "What is your Manager's offic number?",
            name: "managerOfficeNumber"
        }

    ]).then(function (answers) {
        renderTeamMembersQuestion();
        manager = new Manager(answers.managerName, answers.managerId, answers.managerEmailId, answers.managerOfficeNumber);
    });
}