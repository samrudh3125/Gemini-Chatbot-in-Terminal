#!/usr/bin/env node
const {GoogleGenerativeAI}=require('@google/generative-ai');
const {prompt}=require('inquirer');
const {program}=require('commander');

program
    .version('1.0.0')
    .description('Gemini Chatbot in your terminal');

program
    .command('ask')
    .alias('a')
    .description('Get a response from the chatbot')
    .action(async()=>{
        while(1>0){
            const questions=[
                {
                    type:'input',
                    name:'text',
                    message:'YOU:'
                }
            ];
            const {text}=await prompt(questions);
            if(text.toLowerCase()==='exit') process.exit(0);
            const gemini=new GoogleGenerativeAI("your api key here");
            const model=await gemini.getGenerativeModel({model:'gemini-pro'});
            const answer=await model.generateContent(text);
            const send =await answer.response.text();
            console.info("GEMINI:"+send);
        }
    })

program.parse(process.argv);