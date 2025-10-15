import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars'

import dotenv from 'dotenv';
import path from 'path';


// Load .env from the root directory
dotenv.config();
console.log('Email:', process.env.EMAIL);
console.log('Password:', process.env.PASSWORD ? 'Loaded' : 'Not Loaded');

//Configuration transport with GMAIL credentials
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
})

//Configure Handlebars plugin in Nodemailer
const hbsOptions = {
    // viewEngine: {
    //     partialsDir: 'email',
    //     layoutsDir: 'email',
    //     defaultLayout: 'baseMessage'
    // },
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/mainLayout'), // change layout folder name
    partialsDir: path.join(__dirname, 'views/pieces'), // change partials folder name

    viewPath: 'email'
}


transporter.use('compiler', hbs(hbsOptions))

function sendEmail(to, subject, template, context){

    const mailOptions = {
        from: 'binishipiyumika3@gmail.com',
        to,
        subject,
        template,
        context,
    }

    console.log(mailOptions)

    transporter.sendMail(mailOptions, function(err, info){
        if(err){
            console.log('Error : ', err)
        }else{
            console.log('Message sent successfully!')
        }
    })
}

sendEmail('binishipiyumika99@gmail.com', 'Dynamic Email Template with Handlebars', 'NotifyPasswordMessage', { userName: 'John Doe' })