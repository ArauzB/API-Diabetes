const { connection } = require("../services/bd");

const createVentaWithDetalle = async (req, res) => {
    const {id_cliente,fecha,direccion_entrega,notas,detalle} = req.body;
    estado = "Pendiente";

    codigo_orden = Math.floor(Math.random() * 1000000000);

    console.log(req.body);

    if(!notas.trim().length ){
        res.json({
            message: "Faltan datos"
        });
    } else {
        connection.query("SELECT * FROM ORDENES WHERE CODIGO_ORDEN = ?",[codigo_orden], async (error, results) => {
            if(error){
                console.log(error);
            } else {
                if(results.length > 0){
                    codigo_orden = Math.floor(Math.random() * 1000000000);
                } else {
                    connection.query("INSERT INTO ORDENES SET ?",{
                        CLIENTE_ID: id_cliente,
                        FECHA: fecha,
                        DIRECCION_ENTREGA: direccion_entrega,
                        NOTAS: notas,
                        CODIGO_ORDEN: codigo_orden,
                        ESTADO: estado
                    }, async (error, results) => {
                        if(error){
                            console.log(error);
                        } else {
                            const id_orden = results.insertId;

                            const detalleOrden = detalle.map((element) => [
                                id_orden,
                                element.id_material,
                                element.cantidad,
                                element.precio
                            ]);
                            
                            connection.query("INSERT INTO DETALLE_ORDEN (ORDEN_ID, PRODUCTO_ID, CANTIDAD, PRECIO) VALUES ?",[detalleOrden], async (error, results) => {
                                if(error){
                                    console.log(error);
                                } else {
                                    res.json({
                                        message: "Orden creada correctamente"
                                    });
                                }
                            }
                            );
                        }
                    }
                    );
                }
            }
        }
        );
    }
}

const getVentas = async (req, res) => {
    connection.query("SELECT * FROM ORDENES ", async (error, results) => {
        if(error){
            console.log(error);
        } else {
            res.json(results);
        }
    });
}

const getVentaById = async (req, res) => {
    const {id} = req.params;
    connection.query("SELECT * FROM ORDENES WHERE ID = ?",[id], async (error, results) => {
        if(error){
            console.log(error);
        } else {
            res.json(results);
        }
    });
}

const getVentasByCliente = async (req, res) => {
    const {id} = req.params;
    connection.query("SELECT * FROM ORDENES WHERE ID_CLIENTE = ?",[id], async (error, results) => {
        if(error){
            console.log(error);
        } else {
            res.json(results);
        }
    });
}

const cambiarEstadoVenta = async (req, res) => {
   
    const {estado, id_pedido} = req.body;

    console.log(req.body);

    statado = 'Pendiente'

    if (estado == 'Pendiente' ) {

        statado = 'En Proceso';

        connection.query("UPDATE ORDENES SET ESTADO = ? WHERE ID = ?",[statado,id_pedido], async (error, results) => {
            if(error){
                console.log(error);
            } else {
                res.json({
                    message: "Estado actualizado correctamente"
                });
            }
        });

    } else if (estado == 'En Proceso') {
            
        statado = 'Enviado';

            connection.query("UPDATE ORDENES SET ESTADO = ? WHERE ID = ?",[statado,id_pedido], async (error, results) => {
                if(error){
                    console.log(error);
                } else {
                    res.json({
                        message: "Estado actualizado correctamente"
                    });
                }
            });
    
        }
    else if (estado == 'Enviado') {
            
        statado = 'Entregado';

            connection.query("UPDATE ORDENES SET ESTADO = ? WHERE ID = ?",[statado,id_pedido], async (error, results) => {
                if(error){
                    console.log(error);
                } else {
                    res.json({
                        message: "Estado actualizado correctamente"
                    });
                }
            });
    
        }
    else if (estado == 'Entregado') {
            
        statado = 'Cancelado' ;

            connection.query("UPDATE ORDENES SET ESTADO = ? WHERE ID = ?",[statado,id_pedido], async (error, results) => {
                if(error){
                    console.log(error);
                } else {
                    res.json({
                        message: "Estado actualizado correctamente"
                    });
                }
            });
    
        }



  
}

module.exports = {
    createVentaWithDetalle,
    getVentas,
    getVentaById,
    getVentasByCliente,
    cambiarEstadoVenta
}

