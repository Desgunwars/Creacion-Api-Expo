const express = require('express');
const router = express.Router();
const connectionMysql = require('../database/connection');

router.get('/', (req, res) =>{
    connectionMysql.query('SELECT * FROM empleado', (err, rows) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});


router.get('/buscarId/:id', (req, res)=>{
    const { id } = req.params;
    connectionMysql.query('SELECT * FROM empleado WHERE id = ?', [id], (err, rows) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.post('/guardar/', (req, res) =>{
    const { id,nombre, salario } = req.body;
    if((nombre !== null || salario !== null) || (nombre !== undefined || salario !== undefined)){
        connectionMysql.query('insert into empleado (id, nombre, salario) values (?,?,?)', [id,nombre, salario], (err, rows) =>{
            res.json({ status: 'Empleado Guardado'});
        });
    }else{
        console.log(err);
    }
});


router.put('/editar/:id', (req, res) =>{
    const { nombre, salario } = req.body;
    const { id } = req.params;
    connectionMysql.query(`UPDATE empleado SET nombre = ?, salario = ? WHERE id = ?`, [nombre, salario, id],(err, row)=>{
        if(!err){
            res.json({status: 'Empleado actualizado'});
        }else{
            console.log(err);
        }
    });
});


router.delete('/borrar/:id', (req, res) =>{
    const { id } = req.params;
    connectionMysql.query(`DELETE FROM empleado WHERE id = ?`, [id], (err, rows) =>{
        if(!err){
            res.json({status: 'Empleado borrado'});
        }else{
            console.log(err);
        }
    });
});

module.exports = router;