// require('dotenv').config();

// const { MONGODB_DEV_URI, MONGODB_URI, NODE_ENV, JWT_SECRET_KEY, DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, superAdminEmail, superAdminFirstname, superAdminLastname, superAdminPassword, superAdminPhoneNumber, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, MAILING_EMAIL, MAILING_PASSWORD, PAYSTACK_TEST_SECRET_KEY_BU, PAYSTACK_TEST_PUBLIC_KEY_BU, PAYSTACK_TEST_SECRET_KEY_DemoUni, PAYSTACK_TEST_PUBLIC_KEY_DemoUni, PAYSTACK_ACCOUNT_STATUS, PRIMARYUNIVERSITYFORPAYSTACKDEMO } = process.env;

// const requiredCreds = ['JWT_SECRET_KEY', 'NODE_ENV', 'DB_NAME', 'DB_USERNAME', 'DB_PASSWORD', 'DB_HOST', 'superAdminEmail', 'superAdminFirstname', 'superAdminLastname', 'superAdminPassword', 'superAdminPhoneNumber', 'CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET', 'MAILING_EMAIL', 'MAILING_PASSWORD'];

// try {
//     for (const cred of requiredCreds) {
//         if (cred !== 'DB_PASSWORD') {
//             if (!process.env[cred]) {
//                 console.error(`Error: The environment variable ${cred} is missing. Please ensure that it is defined.`);
//                 process.exit(1);
//             }
//         }
//     }
// } catch (err) {
//     console.error(`Error: ${err}`);
//     process.exit(1);
// }

// module.exports = {
//     MONGODB_URI,
//     MONGODB_DEV_URI,
//     NODE_ENV,
//     JWT_SECRET_KEY,
//     DB_NAME,
//     DB_USERNAME,
//     DB_PASSWORD,
//     DB_HOST,
//     superAdminFirstname,
//     superAdminLastname,
//     superAdminPassword,
//     superAdminEmail,
//     superAdminPhoneNumber,
//     CLOUDINARY_CLOUD_NAME,
//     CLOUDINARY_API_KEY,
//     CLOUDINARY_API_SECRET,
//     MAILING_EMAIL,
//     MAILING_PASSWORD,
//     PAYSTACK_TEST_SECRET_KEY_BU,
//     PAYSTACK_TEST_PUBLIC_KEY_BU,
//     PAYSTACK_TEST_SECRET_KEY_DemoUni,
//     PAYSTACK_TEST_PUBLIC_KEY_DemoUni,
//     PAYSTACK_ACCOUNT_STATUS,
//     PRIMARYUNIVERSITYFORPAYSTACKDEMO

// };