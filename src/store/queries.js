//SELECT
const getBOOK = 'SELECT * FROM public."LANGUAGE"';
const getEVENT = 'SELECT * FROM public."EVENT"';
const getEVENTbyId ='SELECT * FROM public."EVENT" WHERE "IdEvent"=$1';
const getAGENCYById ='SELECT * FROM public."AGENCY" WHERE "IdAgency"=$1';
const getEventLocation ='SELECT l."IdLocation",  l."Address", e."IdEvent",   e."EventName" FROM public."LOCATION" l JOIN public."EVENT" e ON l."Id_Event" = e."IdEvent"';
const getWORKPLACE = 'SELECT L."IdLocation",L."Address",  E."IdEmployee", E."EmployeeName", E."Gender" FROM  public."LOCATION" AS L INNER JOIN  public."EMPLOYEE" AS E ON L."IdLocation" = E."Id_Of_Location"';

//UPDATE 
const updateEVENTByID = 'UPDATE public."EVENT" SET "EventName" = $1 WHERE "IdEvent" = $2';
const updateAGENCY = 'UPDATE public."AGENCY" SET "AgencyName" = $1 WHERE "IdAgency" = $2';

//REMOVE
const removeEVENT='DELETE FROM public."EVENT" WHERE "IdEvent" =$1';
const removeAGENCY='DELETE FROM public."AGENCY" WHERE "IdAgency" =$1';

//INSERT
const checkIdEventExists = 'SELECT s FROM "EVENT" s WHERE s."IdEvent" = $1';
const addEVENT = 'INSERT INTO "EVENT" ("IdEvent", "EventName") VALUES ($1, $2)'; 
const checkIdAgencyExists = 'SELECT s FROM "AGENCY" s WHERE s."IdAgency" = $1';
const addAGENCY = 'INSERT INTO "AGENCY" ("IdAgency", "AgencyName", "Founder") VALUES ($1, $2, $3)'; 

const addBook = `INSERT INTO public."BOOK" ("BookNumber", "BookName", "PublicationYear", "Pages", "Id_Language", 
"Id_Inventory", "Publisher_Name", "Id_Age_Category", "Wishlist_Number") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING "BookNumber";`;

const addGenreBook = `INSERT INTO public."GENRE_BOOK" ("GENRE_IdGenre", "BOOK_BookNumber") VALUES ($1, $2);`;

const checkBookExistbyBookNumber = `SELECT * FROM public."BOOK" WHERE "BookNumber" = $1;`;
module.exports = {
    getBOOK,
    getEVENT,
    getEVENTbyId,
    checkIdEventExists,
    addEVENT,
    getAGENCYById,
    checkIdAgencyExists,
    addAGENCY,
    getEventLocation,
    getWORKPLACE,
    updateEVENTByID,
    updateAGENCY,
    removeEVENT,
    removeAGENCY,
    addBook,
    addGenreBook,
    checkBookExistbyBookNumber,
};