import { Logger } from '@oughtabee/common';
import mysql from '@oughtabee/mysql';

const logger = new Logger(__filename);


const TABLE = 'comment';
const COLUMNS = [
    'id',
    'parent',
    'text',
    'json_data',
    'author',
    ...mysql.helpers.TIMESTAMP_COLUMNS
]


interface getManyParams {
    parent: number,
    offset?: number,
    limit?: number
};
const getMany = async ({ parent, offset = 0, limit = 50 }: getManyParams) => {
    logger.extra({ parent, offset, limit })

    const stmt = `
    SELECT 
        ${COLUMNS.join()} 
    FROM
        ${TABLE}
    WHERE
        deleted_at IS NULL
    AND
        parent = ?
    LIMIT ?, ?
    `;

    const res = await mysql.read.query(stmt, [parent, offset, limit]);

    return mysql.helpers.parseArrayOfObjFields(res);
}

interface createOneParams {
    parent: number,
    text: string,
    json_data: {},
    author: number
 };
const createOne = async (values: createOneParams) => {
    logger.extra({ values });

    const stmt = `
    INSERT INTO ${TABLE}
        (${COLUMNS.join()})
    VALUES
        (NULL, ?, ?, ?, ?, NOW(), NOW(), NULL);
    `;

    const params:any = [
        values.parent, 
        values.text, 
        JSON.stringify(values.json_data), 
        values.author
    ];

    const res = await mysql.write.query(stmt, params);

    return { id: res.insertId };
}

interface deleteOneParams { id: number, hard?: boolean };
const deleteOne = async ({ id, hard = false }: deleteOneParams) => {
    logger.extra({ id, hard });

    if (hard) {
        const stmt = `
        DELETE FROM 
            ${TABLE}
        WHERE
            id = ?;
        `;

        await mysql.write.query(stmt, [id]);
    } else {
        const stmt = `
        UPDATE 
            ${TABLE}
        SET
            deleted_at = NOW()
        WHERE
            id = ?
        AND
            deleted_at IS NULL;
        `;

        await mysql.write.query(stmt, [id]);
    };
}


export default {
    getMany,
    createOne,
    deleteOne
}