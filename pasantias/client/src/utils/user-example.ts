import { UserInfo } from '../models';
// usuarios de ejemplo para el login y la persistencia de datos
export const usersExampleList: UserInfo[] = [   
    {
        id: 1,
        email: 'admin@example.com',
        role: 'Admin',
        
    },
    {   
        id: 2,
        email: 'student@example.com',
        role: 'Student',
        step: '0'
    },

    {
        id: 2,
        email: 'studentstep2@example.com',
        role: 'Student',
        step: '2'
    },
    {
        id: 3,
        email: '',
        role: 'Supervisor',
        step: '0'
    }
];

