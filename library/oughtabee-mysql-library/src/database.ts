import mysql from 'mysql';
import { Logger } from '@oughtabee/common';
import { MYSQL_VALIDATION_QUERY } from './constants';
import { parseArrayOfObjFields } from './helpers';

const logger = new Logger(__filename);

export default class Database {
  config;
  getConnection;
  query;
  create;
  destroy;
  recreate;
  isHealthy;
  pool;

  constructor({
    host,
    database,
    user,
    password,
    port = 3306,
    timezone = 'utc',
    charset = 'utf8mb4_general_ci',
    acquireTimeout = 10000,
    waitForConnections = true,
    connectionLimit = 25,
    queueLimit = 0
  }) {
    this.config = {
      connection: {
        host,
        database,
        user,
        password,
        port,
        timezone,
        charset,
        supportBigNumbers: true,
        multipleStatements: true
      },
      pool: { acquireTimeout, waitForConnections, connectionLimit, queueLimit }
    };

    // // establish single connection for validation query
    // const connection = mysql.createConnection(this.config.connection);

    // connection.query('SHOW TABLES', (error) => {
    //     // close single connection
    //     connection.end();

    //     if (error) {
    //         logger.error('Unable to establish database connection:', { host, database, user, port, timezone, connectionLimit }, error);
    //         throw error;
    //     }
    // });

    this.getConnection = () =>
      new Promise((resolve, reject) => {
        this.pool.getConnection((error, connection) => {
          // Check for errors;
          if (error) {
            switch (error.code) {
              case 'PROTOCOL_CONNECTION_LOST':
                // server closed the connection
                logger.error('Connection lost.', error);
                reject(error);
                break;
              case 'ER_CON_COUNT_ERROR':
                logger.error('Connection closed.', error);
                reject(error);
                break;
              case 'ECONNREFUSED ':
                logger.error('Database connection was refused.', error);
                reject(error);
                break;
              default:
                logger.error('Connection error.', error);
                reject(error);
            }
          }

          resolve(connection);
        });
      });

    this.query = async (stmnt: string, params?: any, options: { debug?: boolean, parse?: boolean, single?: boolean } = {}) => {

      if (options.debug) {
        logger.extra(stmnt, params);
      }

      let connection;

      try {
        connection = await this.getConnection();
      } catch (error) {
        // unable to get connection from the pool
        logger.error('Unable to get connection from pool:', error);

        if (['PROTOCOL_CONNECTION_LOST', 'POOL_CLOSED'].indexOf(error.code) >= 1) {
          // recreate the pool here
          this.recreate();
        }

        // create single connection here
        connection = mysql.createConnection(this.config.connection);
      }

      const records = await new Promise((resolve, reject) => {
        connection.query(stmnt, params, (error, results) => {
          // connection.query(stmnt, params, (error, results, fields) => {
          // logger.extra({ fields });
          try {
            if (connection['release']) {
              connection.release();
            } else {
              connection.end();
            }
          } catch (error) {
            logger.error('Unable to close / release connection.', error);
          }

          if (error) {
            logger.error(error);
            reject(error);
          } else if (results) {
            resolve(results);
          }
        });
      });

      // automatically parse query results
      if (options.parse) {

        const results = parseArrayOfObjFields(records as [])

        if (options.single) {
          return results?.[0];
        }

        return results;
      }

      return records;
    };

    this.create = () => {
      // logger.info();
      this.pool = mysql.createPool({ ...this.config.connection, ...this.config.pool });
    };

    this.destroy = (callback) => {
      // logger.info();
      this.pool.end(callback);
    };

    this.recreate = () => {
      // logger.info();
      this.destroy(this.create);
    };

    this.isHealthy = async () => {
      // logger.info();
      const res = await this.query(MYSQL_VALIDATION_QUERY);
      return !!res?.[0];
    };

    this.create();
  }
}