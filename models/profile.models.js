const db = require("../connection");

const getAllUser = async () => {
  try {
    const query = db`SELECT * FROM public."users"`;
    return query;
  } catch (error) {
    return error;
  }
};

const getProfileById = async (id) => {
  try {
    const query = await db`SELECT * FROM public."users" WHERE id = ${id}`;
    return query;
  } catch (error) {
    return error;
  }
};

const getProfileByEmail = async (email) => {
  try {
    const query =
      await db`SELECT * FROM public."users" WHERE LOWER(email) = LOWER(${email})`;
    return query;
  } catch (error) {
    return error;
  }
};

const addUser = async (payload) => {
  try {
    const { email, password, fullname, nohp, role, username, photo, alamat } = payload;
    if (!(email && password && fullname && username)) {
      throw new Error("Bad input, please complete all fields");
    }
    const query = await db`INSERT INTO public.users
      (email, password, fullname, nohp, role, username, photo, alamat)
      VALUES (${email}, ${password}, ${fullname}, ${nohp}, ${role}, ${username}, ${photo}, ${alamat})
      RETURNING *`;

    return query;
  } catch (error) {
    throw error;
  }
};

const editProfile = async (payload, id) => {
  try {
    const query = await db`UPDATE public."users" SET ${db(
      payload,
      "email",
      "password",
      "fullname",
      "nohp",
      "username",
      "role",
    )} WHERE id = ${id} returning *`;
    return query;
  } catch (error) {
    return error;
  }
};

const deleteProfile = async (id) => {
  try {
    const query = await db`DELETE FROM public."users" WHERE id = ${id} returning *`;
    return query;
  } catch (error) {
    return error;
  }
};

const editPhotoUser = async (payload, id) => {
  try {
    const query = await db`UPDATE public."users" set ${db(
      payload,
      "photo"
    )} WHERE id = ${id} returning *`;
    return query;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllUser,
  getProfileById,
  getProfileByEmail,
  editProfile,
  deleteProfile,
  editPhotoUser,
  addUser
};
