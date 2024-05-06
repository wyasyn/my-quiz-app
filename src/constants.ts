// Function to shuffle an array
// Function to shuffle an array
function shuffleArray(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
export const webDevelopmentQuiz = {
    questions: [
        {
            question: "What does HTML stand for?",
            choices: [
                "Hypertext Markup Language",
                "Hyperlink and Text Markup Language",
                "High Tech Markup Language",
                "Hyper Transfer Markup Language",
            ],
            type: "MCQs",
            correctAnswer: "Hypertext Markup Language",
        },
        {
            question: "Which tag is used to create a hyperlink in HTML?",
            choices: ["<a>", "<link>", "<href>", "<hyperlink>"],
            type: "MCQs",
            correctAnswer: "<a>",
        },
        {
            question: "What is the latest version of HTML?",
            choices: ["HTML5", "XHTML", "HTML 4.01", "HTML 3.2"],
            type: "MCQs",
            correctAnswer: "HTML5",
        },
        {
            question: "What does CSS stand for?",
            choices: [
                "Cascading Style Sheets",
                "Creative Style Sheets",
                "Computer Style Sheets",
                "Cool Style Sheets",
            ],
            type: "MCQs",
            correctAnswer: "Cascading Style Sheets",
        },
        {
            question: "Which CSS property is used to change the text color?",
            choices: ["color", "text-color", "font-color", "text"],
            type: "MCQs",
            correctAnswer: "color",
        },
        {
            question: "What does DOM stand for?",
            choices: [
                "Document Object Model",
                "Data Object Model",
                "Dynamic Object Model",
                "Digital Object Model",
            ],
            type: "MCQs",
            correctAnswer: "Document Object Model",
        },
        {
            question:
                "Which programming language is primarily used for web development?",
            choices: ["JavaScript", "Java", "Python", "C#"],
            type: "MCQs",
            correctAnswer: "JavaScript",
        },
        {
            question: "What is the purpose of a <div> tag in HTML?",
            choices: [
                "To define a division or a section in a document",
                "To create a hyperlink",
                "To display an image",
                "To create a list",
            ],
            type: "MCQs",
            correctAnswer: "To define a division or a section in a document",
        },
        {
            question:
                "Which HTTP status code indicates that a resource is permanently gone?",
            choices: ["410", "404", "200", "302"],
            type: "MCQs",
            correctAnswer: "410",
        },
        {
            question: "What does AJAX stand for?",
            choices: [
                "Asynchronous JavaScript and XML",
                "Advanced JavaScript and XML",
                "Asynchronous JavaScript and XHTML",
                "Advanced JavaScript and XHTML",
            ],
            type: "MCQs",
            correctAnswer: "Asynchronous JavaScript and XML",
        },
        {
            question:
                "Which of the following is a popular front-end framework maintained by Google?",
            choices: ["Angular", "React", "Vue", "Ember"],
            type: "MCQs",
            correctAnswer: "Angular",
        },
        {
            question:
                "What does SEO stand for in the context of web development?",
            choices: [
                "Search Engine Optimization",
                "Software Engineering Organization",
                "System Environment Operation",
                "Semantic Entity Organization",
            ],
            type: "MCQs",
            correctAnswer: "Search Engine Optimization",
        },
        {
            question:
                "Which of the following is NOT a valid HTTP request method?",
            choices: ["GET", "POST", "PUSH", "DELETE"],
            type: "MCQs",
            correctAnswer: "PUSH",
        },
        {
            question: "What is the purpose of the <script> tag in HTML?",
            choices: [
                "To define a style for an HTML element",
                "To display an image",
                "To define client-side JavaScript",
                "To create a hyperlink",
            ],
            type: "MCQs",
            correctAnswer: "To define client-side JavaScript",
        },
        {
            question:
                "Which CSS property is used for controlling the layout of elements on a page?",
            choices: ["display", "color", "font-size", "margin"],
            type: "MCQs",
            correctAnswer: "display",
        },
        {
            question:
                "Which of the following is NOT a valid data type in JavaScript?",
            choices: ["string", "boolean", "integer", "object"],
            type: "MCQs",
            correctAnswer: "integer",
        },
        {
            question:
                "What does MVC stand for in the context of web development?",
            choices: [
                "Model-View-Controller",
                "Multiple View Configuration",
                "Model-Validation-Controller",
                "Main-View-Controller",
            ],
            type: "MCQs",
            correctAnswer: "Model-View-Controller",
        },
        {
            question: "Which HTML element is used to define an unordered list?",
            choices: ["<ul>", "<ol>", "<li>", "<list>"],
            type: "MCQs",
            correctAnswer: "<ul>",
        },
        {
            question: "What is the purpose of the CSS property 'margin'?",
            choices: [
                "To control the space outside the border of an element",
                "To control the space inside the border of an element",
                "To change the font size of an element",
                "To change the color of an element",
            ],
            type: "MCQs",
            correctAnswer:
                "To control the space outside the border of an element",
        },
        {
            question:
                "What is the purpose of the 'console.log()' function in JavaScript?",
            choices: [
                "To print output to the console",
                "To create a new element on the web page",
                "To define a variable",
                "To execute a loop",
            ],
            type: "MCQs",
            correctAnswer: "To print output to the console",
        },
        {
            question: "What does API stand for?",
            choices: [
                "Application Programming Interface",
                "Advanced Programming Interface",
                "Application Protocol Interface",
                "Advanced Protocol Interface",
            ],
            type: "MCQs",
            correctAnswer: "Application Programming Interface",
        },
        {
            question: "Which HTML element is used to define a table row?",
            choices: ["<tr>", "<td>", "<table>", "<th>"],
            type: "MCQs",
            correctAnswer: "<tr>",
        },
        {
            question: "What does PHP stand for?",
            choices: [
                "Hypertext Preprocessor",
                "Personal Home Page",
                "Private Home Page",
                "Preprocessed Hypertext",
            ],
            type: "MCQs",
            correctAnswer: "Hypertext Preprocessor",
        },
        {
            question:
                "Which CSS property is used to change the font size of an element?",
            choices: ["font-size", "text-size", "font-style", "size"],
            type: "MCQs",
            correctAnswer: "font-size",
        },
        {
            question: "What does SQL stand for?",
            choices: [
                "Structured Query Language",
                "Standard Query Language",
                "Sequential Query Language",
                "Structured Question Language",
            ],
            type: "MCQs",
            correctAnswer: "Structured Query Language",
        },
    ],
};
// Shuffle the choices for each question
webDevelopmentQuiz.questions.forEach((question) => {
    question.choices = shuffleArray(question.choices);
});
