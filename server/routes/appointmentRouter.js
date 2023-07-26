const Router = require('express');
const router = new Router();
const controller = require("../controllers/appointmentController");

router.get('/getAll', controller.getAllAppointments);
router.post('/create', controller.createAppointments);
router.put('/edit', controller.editAppointments);
router.delete('/clear', controller.clearAppointments);

module.exports = router;
