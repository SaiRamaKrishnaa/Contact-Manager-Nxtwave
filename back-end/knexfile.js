module.exports = {
    development: {
      client: 'sqlite3',
      connection: {
        filename: './data/contacts.db'
      },
      useNullAsDefault: true,
      migrations: {
        directory: './migrations'
      },
      seeds: {
        directory: './seeds'
      }
    }
  };
  