const db = require("../connection");

const register = async (payload) => {
    try {
        const { password, fullname, username } = payload;
        if (!(password && fullname && username)) {
            throw new Error("Bad input, please complete all fields");
        }
        const insertUserQuery = await db`INSERT INTO public.users
            (fullname, username, password, role)
            VALUES (${fullname}, ${username}, ${password}, 'user')
            RETURNING id`;

        return insertUserQuery;
    } catch (error) {
        throw error;
    }
};

const getUsersByUsername = async (username) => {
    try {
        const query = await db`SELECT * FROM public.users WHERE LOWER(username) = LOWER(${username})`;
        return query;
    } catch (error) {
        return error;
    }
};

module.exports = {
    register,
    getUsersByUsername
};
