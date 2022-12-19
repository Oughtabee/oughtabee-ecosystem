import { Logger } from '@oughtabee/common';
import mysql from '@oughtabee/mysql';

const logger = new Logger(__filename);


const TABLE = 'comment';
const COLUMNS = [
    'id',
    'pin_id',
    'text',
    'json_data',
    'user_id',
    ...mysql.helpers.TIMESTAMP_COLUMNS
];

const VOTE_TABLE = 'comment_vote';
const VOTE_COLUMNS = [
    'comment_id',
    'user_id',
    'vote'
];


interface getManyParams {
    pin_id: number,
    offset?: number,
    limit?: number
}; //TODO rough vote count will be stored in json_data
const getMany = async ({ pin_id, offset = 0, limit = 50 }: getManyParams) => {
    logger.extra({ pin_id, offset, limit })

    const stmt = `
    SELECT 
        ${COLUMNS.join()} 
    FROM
        ${TABLE}
    WHERE
        deleted_at IS NULL
    AND
        pin_id = ?
    LIMIT ?, ?
    `;

    const res = await mysql.read.query(stmt, [pin_id, offset, limit]);

    return mysql.helpers.parseArrayOfObjFields(res);
}

interface createOneParams {
    pin_id: number,
    text: string,
    json_data: {},
    user_id: number
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
        values.pin_id, 
        values.text, 
        JSON.stringify(values.json_data), 
        values.user_id
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

interface voteOneParams { comment_id: number, user_id: number, vote: boolean }
const voteOne = async ({ comment_id, user_id, vote }: voteOneParams) => {
    logger.extra({ comment_id, user_id, vote });

    const stmt = `
    REPLACE INTO ${VOTE_TABLE}
        (${VOTE_COLUMNS})
    VALUES
        (?, ?, ?);
    `;

    const params:any = [comment_id, user_id, vote];

    await mysql.write.query(stmt, params);
}

//TODO move this into an asyncronous task
interface getVotesParams { comment_id: number }
const getVotes = async ({ comment_id }: getVotesParams) => {
    logger.extra({});

    const stmt = `
    SELECT 
	    comment_id,
        SUM(vote) AS upvote,
        COUNT(vote) - SUM(vote) AS downvote
    FROM 
        ${VOTE_TABLE}
    WHERE
        comment_id = ?;
    `;

    const res = await mysql.read.query(stmt, [comment_id]);

    return mysql.helpers.parseObjFields(res);
}


export default {
    getMany,
    createOne,
    deleteOne,
    voteOne,
    getVotes
}