const db = require('../util/database');

module.exports = class User {
    constructor(id, email, password,isAdmin, examPassword) {
      this.id = id;
      this.email = email;
      this.password = password
      this.isAdmin = isAdmin
      this.examPassword = examPassword
    }
    save() {
      return db.execute(
        'INSERT INTO users (email, password, isAdmin) VALUES (?, ?, ?)',
        [ this.email, this.password, this.isAdmin]
      );
    }

    static userExist(email) {
      return db.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      )
    }

    static findAndCountAll(limit, offset) {
      return db.execute(`SELECT * FROM users LIMIT ${limit} OFFSET ${offset}`)
    }

    static fetchAll() {
      return db.execute(
        `SELECT * FROM users `
      )
    }

    updateById(id) {
      return db.execute(
        'UPDATE users SET isAdmin=?, examPassword=? WHERE id = ?',
        [this.isAdmin, this.examPassword , id]
      );
    }

    static deleteById(id) {
      return db.execute('DELETE FROM users WHERE users.id=?', [id])
    }
  }