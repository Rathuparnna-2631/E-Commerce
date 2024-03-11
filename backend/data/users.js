import bcrypt from 'bcryptjs'

const users=[
    {
        name:'Admin User',
        email:'admin@email.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:'john',
        email:'john@email.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:false
    },
    {
        name:'jane',
        email:'jane@email.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:false
    }
]

export default users;