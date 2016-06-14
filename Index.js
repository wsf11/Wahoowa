/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

var APP_ID = "amzn1.echo-sdk-ams.app.45ab957b-e478-480c-a8d8-9c5e847bd388";

var WAHOO_FACTS = [
    "u.v.a was founded in 1819 by Thomas Jefferson.",
    "u.v.a has a total of 21,985 students witha 15,669 undergraduate students and 6,316 graduate students.",
    "Famous alumni of u.v.a include Edgar Allen Poe, Woodrow Wilson, Rick Carlisle,Heath Miller, Ryan Zimmerman,Katie Couric, Tina Fey, and Sarah Drew.",
    "Woodrow Wilson was offered the position of the first president of u.v.a, but he turned it down. Edwin Anderson Alderman was then offered the position. ",
    "The celebration of the University's centennial was delayed two years, and celebrated in1921, because of World War I. ",
    "u.v.a has won a total of 24 National Championships.They lead the Atlantic Coast Conference in men's NCAA team national championships with 17. u.v.a is second in women's NCAA titles with 7.",
    "u.v.a has won 24 more national championships than there rival Virginia Tech. Virginia Tech has won zero national championships.",
    "The Oldest, still active Secret Society In u.v.a Is The Eli Banana Society.",
    "The Rotunda Clock is bulletproof.",
    "Jefferson considered the founding of the University to be one of his greatest achievements.",
    "The Rotunda stands at the north end of the Lawn and is half the height and width of the Pantheon in Rome.",
    "There are six active secret societies that are over 100 years old.",
    "The oldest secret society is the Jefferson Literary and Debating Society, which is not so secret anymore. Expulsion was the punishment for revealing the societies secrets.",
    "The Rotunda Burning Society is a secret organization that commemorates the 1895 burning of the Rotunda by burning an effigy of the building each year at the base of the south steps.",
    "Thomas Jefferson thought of Mockingbirds as 'superior beings in the form of a bird.' He had several pet Mockingbirds, but his favorite was named “Dick,”",
    "TJ and his boyhood best friend, Dabney Carr, pledged that they would be buried together under the oak tree where the tombstone is currently located.",
    "Charlottesville was named for Princess Charlotte, wife of George III.",
    "Evan Almighty was filmed in Charlottesville",
    "Charles T. Pepper was the namesake of Dr. Pepper soda. He got his medical degree at u.v.a.",
    "Lighting of the Lawn began in wake of 9/11",
    "Thomas Jefferson died on the 50th anniversary of the signing of the Declaration of Independence. ",
    "Thomas Jefferson sold his library of 6,500 volumes to the Library of Congress after it was ransacked by the British.",
    "Jefferson loved stargazing almost as much as he liked books. He made sure astronomy was taught at the University of Virginia, and he designed what may have been the first observatory in the United States.",
    "It took Jefferson around 40 years to finish Monticello's 33 rooms on four floors.",
    "Brian Boland led u.v.a men's tennis to an undefeated run of 140–0 in ACC matches spanning more than an entire decade (2006–2016)",
    "In 2015, Virginia won the Capital One Cup for the best overall program in men's sports after its teams won the 2014 College Cup, the 2015 College World Series, and the 2015 NCAA Tennis Championships.",
    "In the 21st century alone, u.v.a has won twelve NCAA team national championships.",
    "u.v.a has become just the third ACC basketball program to win 30 games in two consecutive seasons.",
    "Brian O'Connor's teams have made the NCAA Tournament in all thirteen years he has been at U.V.A.",
    "The Pulitzer Prize has been awarded to eight u.v.a alumni.",
    "u.v.a's all time football record is 643-586-48 as of the end of the 2015 season.",
    "u.v.a's largest crowd at a football game was 64,947 people on Aug. 30, 2008 against USC.",
    "u.v.a's mens basketball team has appeared in the NCAA Tournament twenty times.",
    "u.v.a's first basketball season was in 1905 to 1906.",
    "The baseball team has appeared in the college world series four times in the last seven years",
    "Virginia played its first baseball game, a 13-4 win over Richmond College, in 1889.",
    "Virginia has currently made the College Cup tournament bracket for a record consecutive 34 years, the most of any team in the history of the sport.",
    "The athletic teams had previously worn grey and cardinal red but those colors did not show up very well on dirty football fields as the school was sporting its first team.",
    "The men's soccer team has won seven national championships, four consecutively (1989, 1991–1994, 2009, 2014)",
    "The men's lacrosse team has also won seven national titles (1952, 1970, 1972, 1999, 2003, 2006, 2011)"

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
        response.ask("You can say wahoowa, ask wahoowa for a fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Thank you for learning about u.v.a! Go Hoos!";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Thank you for learning about u.v.a! Go Hoos!";
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
    var speechOutput = "Wahoowa, " + fact;

    response.tellWithCard(speechOutput, "WahooFact", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the WahooFact skill.
    var wahoofact = new WahooFact();
    wahoofact.execute(event, context);
};
