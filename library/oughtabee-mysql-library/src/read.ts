import Database from './database';

import {
  MYSQL_READ_HOST,
  MYSQL_READ_USER,
  MYSQL_READ_DATABASE,
  MYSQL_READ_PASSWORD,
  MYSQL_READ_PORT
} from './constants';

const db = new Database({
  host: MYSQL_READ_HOST,
  user: MYSQL_READ_USER,
  password: MYSQL_READ_PASSWORD,
  port: parseInt(MYSQL_READ_PORT || '3306'),
  database: MYSQL_READ_DATABASE,
  timezone: 'utc'
});

export default {
  query: db.query,
  destroy: db.destroy,
  isHealthy: db.isHealthy
};