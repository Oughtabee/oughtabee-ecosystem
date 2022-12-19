import { Logger } from '@oughtabee/common';
import mysql from '@oughtabee/mysql';

const logger = new Logger(__filename);

const TABLE = 'pin';
const COLUMNS = [
    'id',
    'title',
    'location',
    'json_data',
    'user_id',
    ...mysql.helpers.TIMESTAMP_COLUMNS
];

const IMAGE_TABLE = 'pin_image';
const IMAGE_COLUMNS = [
    'id',
    'pin_id',
    'user_id',
    'image_url',
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
    user_id?: number, 
    bounds?: {
        north: number,
        east: number,
        south: number,
        west: number,
    }, 
    offset?: number, 
    limit?: number 
};
export const getMany = async ({ user_id, bounds, offset = 0, limit = 100 }: getManyParams) => {
    logger.extra({ user_id, bounds, offset, limit })

    const stmt = `
    SELECT
        ${COLUMNS.join()}
    FROM
        ${TABLE}
    WHERE
        deleted_at IS NULL
    ${bounds? `AND ST_CONTAINS( Envelope(GeomFromText('LINESTRING(? ?,? ?)')), location)`: ''}
    ${user_id? 'AND user_id = ?': ''}
    LIMIT ?, ?
    `;

    const params:any[] = [];
    if(bounds){
        params.push(bounds.north, bounds.east, bounds.south, bounds.west);
    }
    if(user_id){
        params.push(user_id);
    }
    params.push(offset, limit);


    const res = await mysql.read.query(stmt, params);

    return mysql.helpers.parseArrayOfObjFields(res);
};


interface createOneParams {
    title: string,
    location: [number, number],
    json_data: {},
    user_id: number
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
    params.push(values.user_id);


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

interface getImagesParams { 
    pin_id: number, 
    offset?: number, 
    limit?: number
}
const getImages = async ({ pin_id, offset = 0, limit = 10 }: getImagesParams) => {
    logger.extra({pin_id});

    const stmt = `
    SELECT
        ${IMAGE_TABLE}
    FROM
        ${IMAGE_COLUMNS.join()}
    WHERE
        deleted_at IS NULL
    AND
        pin_id = ?
    ORDER BY created_at DESC
    `;

    const res = await mysql.read.query(stmt, [pin_id]);

    return mysql.helpers.parseArrayOfObjFields(res);
}

interface addImageProps {};
const addImage = ({}: addImageProps) => {
    //TODO implement
}

interface removeImageProps {};
const removeImage = ({}: removeImageProps) => {
    //TODO implement
}


export default {
    getOne,
    getMany,
    createOne,
    deleteOne,
    getImages,
    addImage,
    removeImage
}