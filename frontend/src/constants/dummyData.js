export const dummyPosts = [
    {
        userId: 1,
        user: {
            firstName: 'Appa',
            lastName: '',
            profPic: 'https://i.pinimg.com/originals/f7/52/af/f752afb46e07082cb8e092a0e52cec48.png',
            pronouns: ['he', 'him']
        },
        contact: {
            phoneNumber: '1234567891',
            email: 'appa@gmail.com'
        },
        depDate: new Date('April 4, 2022 12:30:00'),
        type: 'Offering',
        source: 'San Luis Obispo',
        destination: 'San Diego',
        rate: 3.25,
        seats: 3
    },
    {
        userId: 2,
        user: {
            firstName: 'Katara',
            lastName: '',
            profPic: 'https://static.wikia.nocookie.net/characters/images/e/e9/Katara.jpg/revision/latest?cb=20170921222457',
            pronouns: ['she', 'her']
        },
        contact: {
            phoneNumber: '1234567891',
            email: 'katara@gmail.com'
        },
        depDate: new Date('April 1, 2022 17:30:00'),
        type: 'Seeking',
        source: 'San Jose',
        destination: 'San Luis Obispo',
        rate: 20,
        seats: 1   
    },
    {
        userId: 3,
        user: {
            firstName: 'Azula',
            lastName: '',
            profPic: 'https://images2.minutemediacdn.com/image/fetch/w_2000,h_2000,c_fit/https%3A%2F%2Fwinteriscoming.net%2Ffiles%2F2021%2F12%2FAzula.jpeg',
            pronouns: ['she', 'her']
        },
        contact: {
            phoneNumber: '1234567891',
            email: 'azula@gmail.com'
        },
        depDate: new Date("April 10, 2022 12:30:00"),
        type: 'Offering',
        source: 'San Luis Obispo',
        destination: 'Seattle',
        rate: 100,
        seats: 3  
    },
    {
        userId: 1,
        user: {
            firstName: 'Appa',
            lastName: '',
            profPic: 'https://i.pinimg.com/originals/f7/52/af/f752afb46e07082cb8e092a0e52cec48.png',
            pronouns: ['he', 'him']
        },
        contact: {
            phoneNumber: '1234567891',
            email: 'appa@gmail.com'
        },
        depDate: new Date('April 20, 2022 11:30:00'),
        type: 'Offering',
        source: 'San Diego',
        destination: 'San Luis Obispo',
        rate: 3.25,
        seats: 3
    },
    {
        userId: 2,
        user: {
            firstName: 'Katara',
            lastName: '',
            profPic: 'https://static.wikia.nocookie.net/characters/images/e/e9/Katara.jpg/revision/latest?cb=20170921222457',
            pronouns: ['she', 'her']
        },
        contact: {
            phoneNumber: '1234567891',
            email: 'katara@gmail.com'
        },
        depDate: new Date('April 11, 2022 11:30:00'),
        type: 'Seeking',
        source: 'San Luis Obispo',
        destination: 'San Jose',
        rate: 20,
        seats: 1   
    },
]

export const dummyNotifs = {
    userId: 1,
    notifs: {
        riderRequests: [
            {
                user: {
                    firstName: 'Appa',
                    lastName: '',
                    profPic: 'https://i.pinimg.com/originals/f7/52/af/f752afb46e07082cb8e092a0e52cec48.png',
                    pronouns: ['he', 'him']
                },
                notif: {
                    depDate: new Date('April 20, 2022 11:30:00'),
                    source: 'San Diego',
                    destination: 'San Luis Obispo'
                }
            },
            {
                user: {
                    firstName: 'Katara',
                    lastName: '',
                    profPic: 'https://static.wikia.nocookie.net/characters/images/e/e9/Katara.jpg/revision/latest?cb=20170921222457',
                    pronouns: ['she', 'her']
                },
                notif: {
                    depDate: new Date('April 20, 2022 11:30:00'),
                    source: 'San Diego',
                    destination: 'San Luis Obispo'
                }
            }
        ],
        riderOffers: [
            {
                user: {
                    firstName: 'Azula',
                    lastName: '',
                    profPic: 'https://images2.minutemediacdn.com/image/fetch/w_2000,h_2000,c_fit/https%3A%2F%2Fwinteriscoming.net%2Ffiles%2F2021%2F12%2FAzula.jpeg',
                    pronouns: ['she', 'her']
                },
                notif: {
                    depDate: new Date('April 21, 2022 11:30:00'),
                    type: 'Offering',
                    source: 'San Diego',
                    destination: 'San Luis Obispo'
                }
            }
        ]
    }
}

export const dummyMessages = [
    {
        to_user: {
            firstName: 'Appa',
            lastName: '',
            profPic: 'https://i.pinimg.com/originals/f7/52/af/f752afb46e07082cb8e092a0e52cec48.png',
            pronouns: ['he', 'him']
        },
        from_user: {
            firstName: 'Katara',
            lastName: '',
            profPic: 'https://static.wikia.nocookie.net/characters/images/e/e9/Katara.jpg/revision/latest?cb=20170921222457',
            pronouns: ['she', 'her']
        },
        message: 'Hi! I am interested in your ride share!',
        date_time: new Date('April 11, 2022 11:30:00'),
        read: true
    },
    {
        to_user: {
            firstName: 'Katara',
            lastName: '',
            profPic: 'https://static.wikia.nocookie.net/characters/images/e/e9/Katara.jpg/revision/latest?cb=20170921222457',
            pronouns: ['she', 'her']
        },
        from_user: {
            firstName: 'Appa',
            lastName: '',
            profPic: 'https://i.pinimg.com/originals/f7/52/af/f752afb46e07082cb8e092a0e52cec48.png',
            pronouns: ['he', 'him']
        },
        message: 'Awesome! I will add you to my list of riders',
        date_time: new Date('April 11, 2022 11:45:00'),
        read: false
    },
    {
        to_user: {
            firstName: 'Azula',
            lastName: '',
            profPic: 'https://images2.minutemediacdn.com/image/fetch/w_2000,h_2000,c_fit/https%3A%2F%2Fwinteriscoming.net%2Ffiles%2F2021%2F12%2FAzula.jpeg',
            pronouns: ['she', 'her']
        },
        from_user: {
            firstName: 'Appa',
            lastName: '',
            profPic: 'https://i.pinimg.com/originals/f7/52/af/f752afb46e07082cb8e092a0e52cec48.png',
            pronouns: ['he', 'him']
        },
        message: 'Hi! I would be able to give you a ride, if you are COVID vaccinated',
        read: false
    }
];