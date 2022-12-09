import Database from './database';

import {
  MYSQL_WRITE_HOST,
  MYSQL_WRITE_USER,
  MYSQL_WRITE_DATABASE,
  MYSQL_WRITE_PASSWORD,
  MYSQL_WRITE_PORT
} from './constants';

const db = new Database({
  host: MYSQL_WRITE_HOST,
  user: MYSQL_WRITE_USER,
  password: MYSQL_WRITE_PASSWORD,
  port: parseInt(MYSQL_WRITE_PORT || '3306'),
  database: MYSQL_WRITE_DATABASE,
  timezone: 'utc'
});

export default {
  query: db.query,
  destroy: db.destroy,
  isHealthy: db.isHealthy
};