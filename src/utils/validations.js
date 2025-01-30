/**
model user {
  id       Int     @id @default(autoincrement())
  name     String
  user     String
  email    String
  password String
  tasks    task[]
}
*/

const validationEmail = async (email) => {
    const regex = /^[a-zA-Z0-9]{4,}@[a-zA-Z0-9]{3,}\.[a-zA-Z]{2,}$/;

    return regex.test(email);
}

module.exports = { validationEmail };