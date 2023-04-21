const db = require('../util/database');


module.exports = class Answer {
  constructor(id, exam, subject, answer, userId) {
    this.id = id;
    this.exam = exam;
    this.subject = subject;
    this.answer = answer;
    this.userId = userId;
  }

  save() {
    return db.execute(
      'INSERT INTO answers (exam, subject, answer, userId) VALUES (?, ?, ?, ?)',
      [this.exam , this.subject, this.answer, this.userId]
    );
  }

  static deleteById(id) {
    return db.execute('DELETE FROM answers WHERE answers.id=?', [id])
  }

  static fetchAll() {
    return db.execute('SELECT * FROM answers');
  }

  static findAndCountAll(limit, offset) {
    return db.execute(`SELECT * FROM answers LIMIT ${limit} OFFSET ${offset}`)
  }

  static findById(id) {
    return db.execute('SELECT * FROM answers WHERE answers.id = ?', [id]);
  }

  updateById(id) {
    return db.execute(
      'UPDATE answers SET exam=?, subject=?, answer=?, userId=? WHERE id = ?',
      [this.exam, this.subject, this.answer, this.userId, id]
    );
  }
};
