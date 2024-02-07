// Convert a string to sentence case meaning the first letter should be capitalized;
const toSentenceCase = (str) => str.charAt(0).toUpperCase() + str.substr(1);


// NB: Sequelize error property returns 3 main properties - name, message and errors and also returns additional properties like parent, original. We're using the errors, and name property from sequelize to define our method.
// Types of Sequelize Error - ValidationError, UniqueConstraintError, ForeignKeyConstraintError, ExclusionConstraintError. others include - Connection error, database error, access denied error type validation etc. The first 3 are the main ones to deal with.
// NB: Properties the error object/instance returns - error name, error message, errors property (Array of errors), parent if from parent and original. Parent and Original signifies error from database layer


/** Translate Sequelize ValidationError or UniqueConstraintError or any other SQL error (e.g. ForeignKeyConstraintError, ExclusionConstraintError, Connection error, database error, access denied error, Type validation error etc.) into a
 *  human readable string and returns the format of our result service as follows [success, data, message, metadata ]
 *  NB: The error property passed in contains 5 main properties - error name, message, errors, parent and original. Parent and Original indicates error from the database level.
 *  In this case, after error messages have been made into a readable format
 *  The function returns [false, null, error[0]/Something went wrong in ${passedInMessage}, { status: 400/500, errors}]
 *  
 * @param {*} err
 * @param {*} passedInMessage
 * */
const translateError = (err, passedInMessage) => {
    const errors = [];
    let result;

    if (err.name === "SequelizeUniqueConstraintError") {

        const field = err.errors[0].path;
        errors.push(toSentenceCase(`${field} already exists.`));
        
        result = [false, null, errors[0], { status: 400, errors }];

    } else if (err.name === "SequelizeValidationError") {

        // Map through the errors array property defined on the error object 
        err.errors.map((err) => {

            // If it is a null value error - show a message of "(field) required and cannot be empty." else return a modified message that doesn't show the model name but just the message using string manipulation (indexOF, substring and toSentence method)
            // e.g. err.message = UniversityBank.gatewayNum cannot be null - GatewayNum is required and cannot be empty. OR User.email is not a valid email - Email is not a valid email.
            if (err.type === "notNull Violation") {
                const field = err.path;
                errors.push(toSentenceCase(`${field} is required and cannot be empty.`))

            } else {
                const modelNameEndingIndex = err.message.indexOf('.'); // Find the first occurrence of the fullstop in the message string, which is after the model name
                const startingIndex = modelNameEndingIndex + 1;     //Index which would be used to return the part of the message we want to show.
                let message = err.message.substring(startingIndex);     //This returns the error message after skipping the model name i.e. Substring returns the message from the specified starting index of the string till the end of the string.
                const formattedMessage = toSentenceCase(message).replace(/_/g, ' ');        //If the message has underscore replace it with a space ' '
                errors.push(formattedMessage);  //Push the error message to the errors array

            }
        })
        result = [false, null, errors[0], { status: 400, errors }]

    } else {
        const errorMessage = err.message;
        const errorType = err.name;
        // If the errors is a sequelizeDatabaseError then it is a 400 error else it is a 500 error.
        const status = errorType === "SequelizeDatabaseError" ? 400 : 500
        const error = toSentenceCase(errorMessage);
        
        errors.push(error);
        result = [false, null, `Something went wrong in ${passedInMessage}`, { status, errors }];
    }

    return result;

}

module.exports = {
    translateError
}