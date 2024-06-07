const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get("/BOOK", controller.getBOOK);
router.get("/EVENT", controller.getEVENT);
router.get("/EventLocation", controller.getEventLocation);
router.get("/WORKPLACE", controller.getWORKPLACE);
router.get("/EVENTbyId/:IdEvent", controller.getEVENTbyId);
router.put("/EVENTByID/:IdEvent", controller.updateEVENTByID);
router.get("/AGENCYById/:IdAgency", controller.getAGENCYById);
router.put("/AGENCY/:IdAgency", controller.updateAGENCY);
router.delete("/EVENT/:IdEvent", controller.removeEVENT);
router.delete("/AGENCY/:IdAgency", controller.removeAGENCY);
router.post("/EVENT",controller.addEVENT );
router.post("/AGENCY",controller.addAGENCY );
router.post('/addBookWithGenre', controller.addBookWithGenre);

module.exports = router;