import { Logger } from '@oughtabee/common';
import mysql from '@oughtabee/mysql';

const logger = new Logger(__filename);

const TABLE = 'pin';
const COLUMNS = [
    'id',
    'title',
    'location',
    'json_data',
    'author',
    ...mysql.helpers.TIMESTAMP_COLUMNS
];


interface getOneParams { id: number }
export const getOne = async ({ id }: getOneParams) => {
    logger.extra({ id });

    const stmt = `
    SELECT 
        ${COLUMNS.join()}
    FROM 
        ${TABLE}
    WHERE 
        id = ?
    AND
        deleted_at IS NULL`;

    const res = await mysql.read.query(stmt, [id]);

    mysql.helpers.throwNotFound(res);

    return mysql.helpers.parseObjFields(res);
};


interface getManyParams { 
    author?: number, 
    bounds?: {
        north: number,
        east: number,
        south: number,
        west: number,
    }, 
    offset?: number, 
    limit?: number 
};
export const getMany = async ({ author, bounds, offset = 0, limit = 100 }: getManyParams) => {
    logger.extra({ author, bounds, offset, limit })

    const stmt = `
    SELECT
        ${COLUMNS.join()}
    FROM
        ${TABLE}
    WHERE
        deleted_at IS NULL
    ${bounds? `AND ST_CONTAINS( Envelope(GeomFromText('LINESTRING(? ?,? ?)')), location)`: ''}
    ${author? 'AND author = ?': ''}
    LIMIT ?, ?
    `;

    const params:any[] = [];
    if(bounds){
        params.push(bounds.north, bounds.east, bounds.south, bounds.west);
    }
    if(author){
        params.push(author);
    }
    params.push(offset, limit);


    const res = await mysql.read.query(stmt, params);

    return mysql.helpers.parseArrayOfObjFields(res);
};


interface createOneParams {
    title: string,
    location: [number, number],
    json_data: {},
    author: number
}
export const createOne = async (values: createOneParams) => {
    logger.extra({ values });

    const stmt = `
    INSERT INTO ${TABLE}
        (${COLUMNS.join()})
    VALUES
        ( NULL, ?, Point(?, ?), ?, ?, NOW(), NOW(), NULL );
    `;

    const params:any[] = [];
    params.push(values.title);
    params.push(values.location[0]);
    params.push(values.location[1]);
    params.push(JSON.stringify(values.json_data));
    params.push(values.author);


    const res = await mysql.write.query(stmt, params);

    return { id: res.insertId }
};


interface deleteOneParams { id: number, hard?: boolean }
export const deleteOne = async ({ id, hard = false }: deleteOneParams) => {
    logger.extra({ id });

    if(hard) {
        const stmt = `
        DELETE FROM
            ${TABLE}
        WHERE 
            id = ?
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
            deleted_at IS NULL
        `;

        await mysql.write.query(stmt, [id]);
    }
};


export default {
    getOne,
    getMany,
    createOne,
    deleteOne
}