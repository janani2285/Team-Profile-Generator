const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

/* function startApp(){
    let engineerArr = [];
let internArr = [];

renderQuestions();

} */


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
       // console.log(answers.teamMember);
         if (answers.teamMember === "Engineer") {
            renderEngineerQuestions();
        } else if (answers.teamMember === "Intern") {
            renderInternQuestions();
        } else {
            renderHtml();
        } 
    })
}
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
    })

}


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

        ]).then(function(answers){
             internArr.push(new Engineer(answers.internName, answers.internId, answers.internEmailId, answers.internSchool));
        renderTeamMembersQuestion();
        })
}

function renderHtml() {

}

 function renderQuestions() {
    
        console.log("Please build your team");
        const answers =  inquirer.prompt([
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

        ]).then(function(answers){
             renderTeamMembersQuestion();
       //  console.log(new Manager(answers.managerName,answers.managerId,answers.managerEmailId,answers.managerOfficeNumber));
        })
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
