const getMatchedUserInfo = (users, userloggedin) => {
    const newUsers = { ...users };
    delete newUsers[userloggedin];

    const [id, user] = Object.entries(newUsers).flat();

    return { id, ...user };
}

export default getMatchedUserInfo