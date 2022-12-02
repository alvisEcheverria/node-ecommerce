const db = require('../utils/database');
const { Users, Participants, Messages, Conversations } = require('../models');
const initModels = require('../models/initModels');

initModels();


const users =   [
                    {
                        firstName: 'María', 
                        lastName: 'Godoy', 
                        email: 'maria@gmail.com', 
                        password: '1234', 
                        phone: '0000000000'
                    },
                    {
                        firstName: 'Germán',
                        lastName: 'Silva',
                        email: 'ger@hotmail.com',
                        password: '123456',
                        phone: '5599887744'
                    },
                    { 
                        firstName: 'Jose', 
                        lastName: 'Tejero', 
                        email: 'jose@email.com', 
                        password: '1234', 
                        phone: '9999999999' 
                    }
                ];

const conversations =   [
                            {
                                title: 'Con el compa',
                                createdBy: 2
                            },
                            {
                                title: 'Con los compas',
                                type: 'group',
                                createdBy: 1
                            },
                            {
                                title: 'No idea',
                                createdBy: 3
                            }
                        ];

const participants =    [
                            {
                                conversationId: 1,
                                userId: 2
                            },
                            {
                                conversationId: 1,
                                userId: 1
                            },
                            {
                                conversationId: 2,
                                userId: 1
                            },
                            {
                                conversationId: 2,
                                userId: 2
                            },
                            {
                                conversationId: 2,
                                userId: 3
                            },
                            {
                                conversationId: 3,
                                userId: 3
                            },
                            {
                                conversationId: 3,
                                userId: 1
                            }
                        ];

const messages = [
                    {senderId: 2, conversationId: 1, message: 'Hola'},
                    {senderId: 1, conversationId: 1, message: 'Olis'},
                    {senderId: 2, conversationId: 1, message: 'Cómo vas?'},
                    {senderId: 3, conversationId: 2, message: 'Hola'},
                    {senderId: 1, conversationId: 2, message: 'Hello'},
                    {senderId: 3, conversationId: 2, message: 'Hi'},
                    {senderId: 2, conversationId: 2, message: 'Aloha'},
                    {senderId: 3, conversationId: 3, message: 'Epa!'},
                    {senderId: 1, conversationId: 3, message: 'Hey!'}
                ]

db.sync({force: true})
.then(()=> {
    console.log('Sincronizado')
    users.forEach(async user => await Users.create(user));
    setTimeout(()=>{
        conversations.forEach(async conversation => await Conversations.create(conversation));
    }, 100);
    setTimeout(()=>{
        participants.forEach(async participant => await Participants.create(participant));
    }, 200);
    setTimeout(()=>{
        messages.forEach(async message => await Messages.create(message));
    }, 300);
})
            