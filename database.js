const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

/// RADNICI ///////////////////////////////////////////////////////////////
const getWorkers = async () => {
  const [workers] = await pool.query("SELECT * FROM zaposleni");
  return workers;
};

const getSingleWorker = async (qrid) => {
  const [worker] = await pool.query("SELECT * FROM zaposleni WHERE qrid=?", [
    qrid,
  ]);
  return worker[0];
};

////// EVIDENCIJA ////////////////////////////////////////////////////////////////////////
const getRecords = async () => {
  const [evidencija] = await pool.query(
    "SELECT * FROM evidencija,zaposleni,parcele, operacije WHERE evidencija.parcela_id = parcele.pid AND evidencija.operacija_id = operacije.oid"
  );
  return evidencija;
};

const getRecordsByDate = async (date) => {
  const [evidencija] = await pool.query(
    "SELECT eid,evidencija.qrid,first_name,last_name,operacija_id,naziv_operacije,parcela_id,naziv_parcele,created FROM evidencija,zaposleni,parcele, operacije WHERE evidencija.qrid=zaposleni.qrid AND evidencija.created LIKE CONCAT(?,  '%') AND evidencija.parcela_id = parcele.pid AND evidencija.operacija_id = operacije.oid",
    [date]
  );
  return evidencija;
};

const getRecordsByPeriod = async (dateFrom, dateTo) => {
  const [evidencija] = await pool.query(
    "SELECT operacija_id,naziv_operacije,parcela_id,naziv_parcele,created FROM evidencija,zaposleni,parcele, operacije WHERE evidencija.qrid=zaposleni.qrid AND evidencija.created >= ? AND evidencija.created <= ? AND evidencija.parcela_id = parcele.pid AND evidencija.operacija_id = operacije.oid ORDER BY evidencija.created",
    [dateFrom, dateTo]
  );
  return evidencija;
};

const addWorkerToRecords = async (qrid, parcela_id, operacija_id) => {
  await pool.query(
    "INSERT INTO evidencija (qrid,parcela_id,operacija_id) VALUES (?, ?, ?)",
    [qrid, parcela_id, operacija_id]
  );
};

////// PARCELE ////////////////////////////////////////////////////////////////////////

const getAreas = async () => {
  const [parcele] = await pool.query("SELECT * FROM parcele");
  return parcele;
};

const getSingleArea = async (area_id) => {
  const [parcela] = await pool.query("SELECT * FROM parcele WHERE pid=?", [
    area_id,
  ]);
  return parcela;
};

////// OPERACIJE ////////////////////////////////////////////////////////////////////////

const getOperations = async () => {
  const [operacije] = await pool.query("SELECT * FROM operacije");
  return operacije;
};

const getSingleOperation = async (operation_id) => {
  const [operacija] = await pool.query("SELECT * FROM operacije WHERE oid=?", [
    operation_id,
  ]);
  return operacija;
};

module.exports = {
  getWorkers,
  getSingleWorker,
  getRecords,
  getRecordsByDate,
  getRecordsByPeriod,
  addWorkerToRecords,
  getAreas,
  getSingleArea,
  getOperations,
  getSingleOperation,
};
