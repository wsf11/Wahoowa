/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

var APP_ID = "amzn1.echo-sdk-ams.app.45ab957b-e478-480c-a8d8-9c5e847bd388";

var WAHOO_FACTS = [
    "UVa was founded in 1819 by Thomas Jefferson.",
    "UVa is ranked the #3 best national public University.",
    "UVa is the ranked the #26 best national University.",
    "UVa has a total of 21,985 students witha 15,669 undergraduate students and 6,316 graduate students.",
    "89% of the students admitted to the University of Virginia are in the top 10% of there class",
    "UVa has a total of 15,514 staff members.",
    "Famous alumni of UVa include Edgar Allen Poe, Woodrow Wilson, Rick Carlisle,Heath Miller, Ryan Zimmerman,Katie Couric, Tina Fey, and Sarah Drew.",
    "UVa refers to Freshman,Sophomores, Juniors, and Seniors as First, Second, Third, and Fourth Years respectively.",
    "UVa refers to Campus as Grounds.",
    "The mid 50% SAT Scores for the entering class of 2015 was a 1250-1460, two part. ",
    "The mid 50% ACT Scores for the entering class of 2015 was a 29-33.",
    "Since U.S. News And World Report began ranking colleges over 20 years ago, UVA has never been below the top 25 of all American universities. Since U.S. News ranked public universities separately, UVA has always been ranked either number one or number two. ",
    "Woodrow Wilson was offered the position of the first president of UVA, but he turned it down. Edwin Anderson Alderman was then offered the position. ",
    "The celebration of the University's centennial was delayed two years, and celebrated in1921, because of World War I. ",
    "UVa offers 121 majors across eight undergraduate and three professional schools.",
    "UVa has won a total of 24 National Championships.They lead the Atlantic Coast Conference in men's NCAA team national championships with 17. UVA is second in women's NCAA titles with 7.",
    "UVa has won 24 more national championships than there rival Virginia Tech. Virginia Tech has won zero national championships.",
    "All first years are required to live on Grounds.",
    "35% of the undergraduate population is apart of Greek Life at the University of Virginia.",
    "UVa has a 33% acceptance rate.",
    "UVa is located in Charlottesville,Virginia.",
    "The Oldest, still active Secret Society In UVA Is The Eli Banana Society.",
    "The Rotunda Clock is bulletproof.",
    "Jefferson considered the founding of the University to be one of his greatest achievements.",
    "the Rotunda stands at the north end of the Lawn and is half the height and width of the Pantheon in Rome.",
    "UVa's official mascot is the Cavalier; however, they unofficially adopted the Wahoo also. Later, this was shorted to 'Hoos'.",
    "It is considered an honor at the University to live in one of the prestigious Lawn rooms.",
    "Favorite classes at the University are Dracula, History of Mr. Jefferson's University,The Best of UVA:  A Collection of Unforgettable Lectures,Elementary American Sign Language I, and Issues of Life and Death.",
    "UVa is sometimes referred to as 'Mr. Jefferson's University'.",
    "There are six active secret societies that are over 100 years old.",
    "The oldest secret society is the Jefferson Literary and Debating Society, which is not so secret anymore. Expulsion was the punishment for revealing the societies secrets.",
    "The Rotunda Burning Society is a secret organization, presumably founded sometime after 1974 and before 1993, that commemorates the 1895 burning of the Rotunda by burning an effigy of the building each year at the base of the south steps.",
    "Thomas Jefferson thought of Mockingbirds as 'superior beings in the form of a bird.' He had several pet Mockingbirds, but his favorite was named “Dick,”",
    "TJ and his boyhood best friend, Dabney Carr, pledged that they would be buried together under the oak tree where the tombstone is currently located.",
    "Charlottesville was named for Princess Charlotte, wife of George III.",
    "Evan Almighty was filmed in Charlottesville",
    "Charles T. Pepper was the namesake of Dr. Pepper soda. He got his medical degree at UVA.",
    "The median annual base salary for graduating from UVA is 70,000",
    "Lighting of the Lawn began in wake of 9/11"
];


var AlexaSkill = require('./AlexaSkill');


var WahooFact = function () {
    AlexaSkill.call(this, APP_ID);
};


WahooFact.prototype = Object.create(AlexaSkill.prototype);
WahooFact.prototype.constructor = WahooFact;

WahooFact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("WahooFact onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

WahooFact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("WahooFact onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};


WahooFact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("WahooFact onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

WahooFact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say Wahoowa, ask Wahoowa for a fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Thank you for learning about UVa! Go Hoos!";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Thank you for learning about UVa! Go Hoos!";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random fact
    var factIndex = Math.floor(Math.random() * WAHOO_FACTS.length);
    var fact = WAHOO_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Wahoowa " + fact;

    response.tellWithCard(speechOutput, "WahooFact", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the WahooFact skill.
    var wahoofact = new WahooFact();
    wahoofact.execute(event, context);
};
