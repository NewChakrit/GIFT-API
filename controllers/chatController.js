const { Room, sequelize, Message } = require("../dbs/models/index");
const { QueryTypes } = require("sequelize");

const { Op } = require("sequelize");

exports.getAllChat = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const rooms = await sequelize.query(
      `SELECT r.id as roomId , r.members as member ,m.created_at as updateTimeMessage , m.message as message ,u.id as friendId , u.username as username , u.first_name as firstName,u.last_name as lastName, u.profile_url as profileUrl
            FROM rooms as r 
            left join (select room_id,message,created_at,rank() over(partition by room_id order by created_at desc) rw from messages ) as m on r.id = m.room_id and m.rw = 1
            left join users as u on SUBSTRING_INDEX(r.members, '-', 1)!=${userId} and SUBSTRING_INDEX(r.members, '-', 1)=u.id  or SUBSTRING_INDEX(r.members, '-', -1)!=${userId} and SUBSTRING_INDEX(r.members, '-', -1)=u.id
            where SUBSTRING_INDEX(r.members, '-', 1) = ${userId} or SUBSTRING_INDEX(r.members, '-',-1) =${userId}`,
      { type: QueryTypes.SELECT }
    );
    res.status(200).json({ rooms });
  } catch (err) {
    next(err);
  }
};

exports.getMessage = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const message = await sequelize.query(
      `select * from messages where user_id in (${userId} , ${id})`
    );
    res.status(200).json({ message });
  } catch (err) {
    next(err);
  }
};

exports.deleteChat = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result2 = await Message.destroy({ where: { roomId: id } });
    const resulte = await Room.destroy({ where: { id: id } });
    if (resulte === 0) {
      res.status(400).json({ message: "can't delete chat room" });
    }
    if (result2 === 0) {
      res.status(400).json({ message: "can't delete chat message" });
    }

    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
