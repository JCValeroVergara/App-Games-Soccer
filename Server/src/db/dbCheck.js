const pool = require('./postgres');

const checkConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('DB connection successful');
    client.release(); // Liberar la conexión
    return true;
  } catch (error) {
    console.error('Error in DB connection:', error);
    return false;
  }
};

module.exports = checkConnection;
