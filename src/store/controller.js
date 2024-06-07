
const pool = require('../../db');
const queries = require('./queries');

//SELECT BOOK BY LANGUANGE
const getBOOK = (req, res) => {
    pool.query(queries.getBOOK, (error,results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}; 

//SELECT EVENT  
const getEVENT = (req, res) => {
    pool.query(queries.getEVENT, (error,results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}; 

//SELECT EVENT BY LOCATION
const getEventLocation = (req, res) => {
    pool.query(queries.getEventLocation, (error,results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};


//SELECT WORKPLACE
const getWORKPLACE = (req, res) => {
    pool.query(queries.getWORKPLACE, (error,results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

//SELECT EVENT BY IDEVENT
const getEVENTbyId = (req, res) => {
    const IdEvent = parseInt(req.params.IdEvent);
  
    pool.query(queries.getEVENTbyId, [IdEvent], (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    });
  };

//UPDATE EVENT BY ID
const updateEVENTByID = (req, res) => {
    const IdEvent = parseInt(req.params.IdEvent);
    const { EventName } = req.body;
  
    pool.query(queries.getEVENTbyId, [IdEvent], (error, results) => {
      const noEVENTFound = !results.rows.length;
      if (noEVENTFound) {
        res.send("EVENT does not exist in the database");
      }
      pool.query(queries.updateEVENTByID, [EventName, IdEvent], (error, results) => {
        if (error) throw error;
        res.status(200).send("EVENT updated successfully!");
      });
    });
  };

  //SELECT AGENCY BY IDAGENCY
const getAGENCYById = (req, res) => {
    const IdAgency = parseInt(req.params.IdAgency);
  
    pool.query(queries.getAGENCYById, [IdAgency], (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    });
  };

//UPDATE AGENCY BY ID
const updateAGENCY = (req, res) => {
    const IdAgency = parseInt(req.params.IdAgency);
    const { AgencyName } = req.body;
  
    pool.query(queries.getAGENCYById, [IdAgency], (error, results) => {
      const noAGENCYFound = !results.rows.length;
      if (noAGENCYFound) {
        res.send("AGENCY does not exist in the database");
      }
      pool.query(queries.updateAGENCY, [AgencyName, IdAgency], (error, results) => {
        if (error) throw error;
        res.status(200).send("AGENCY updated successfully!");
      });
    });
  };

//DELETE ROW ON EVENT TABLE
const removeEVENT=(req, res) => {
    const IdEvent = parseInt(req.params.IdEvent);

    pool.query(queries.getEVENTbyId, [IdEvent], (error, results)=> {
        const noEVENTFound =!results.rows.length;
        if (noEVENTFound){
            res.send("Event does not exist in the database");
        }

        pool.query(queries.removeEVENT, [IdEvent], (error, results)=> {
            if (error) throw error;
            res.status(200).send("Event removed successfully");
        });
    });
};

//DELETE ROW ON AGENCY TABLE
const removeAGENCY=(req, res) => {
    const IdAgency = parseInt(req.params.IdAgency);

    pool.query(queries.getAGENCYById, [IdAgency], (error, results)=> {
        const noAGENCYFound =!results.rows.length;
        if (noAGENCYFound){
            res.send("Agency does not exist in the database");
        }

        pool.query(queries.removeAGENCY, [IdAgency], (error, results)=> {
            if (error) throw error;
            res.status(200).send("Agency removed successfully");
        });
    });
};

//INSERT EVENT
const addEVENT =(req, res) => {
    const {IdEvent, EventName} = req.body;
    pool.query(queries.checkIdEventExists, [IdEvent], (error, results)=> {
        if(results.rows.length){
            res.send("Id Event already exists");
        }
        pool.query(queries.addEVENT,[IdEvent, EventName], (error, results)=> {
            if(error) throw error;
            res.status(201).send("Event Created successfully");
            
        }
    );
    });
};

//INSERT AGENCY
const addAGENCY =(req, res) => {
    const {IdAgency, AgencyName, Founder} = req.body;
    pool.query(queries.checkIdAgencyExists, [IdAgency], (error, results)=> {
        if(results.rows.length){
            res.send("Id Agency already exists");
        }
        pool.query(queries.addAGENCY,[IdAgency, AgencyName, Founder], (error, results)=> {
            if(error) throw error;
            res.status(201).send("Agency Created successfully");
            
        }
    );
    });
};

//TCL
const addBookWithGenre = async (req, res) => {
    const client = await pool.connect();
    const { BookNumber, BookName, PublicationYear, Pages, Id_Language, Id_Inventory, Publisher_Name, Id_Age_Category, Wishlist_Number, IdGenre } = req.body;

    try {
        await client.query('BEGIN');
        
        // Check if BookNumber already exists
        const BOOKExists = await client.query(queries.checkBookExistbyBookNumber, [BookNumber]);
        if (BOOKExists.rows.length) {
            await client.query('ROLLBACK');
            return res.status(400).send("Book already exists.");
        }

        // Add new book
        const result = await client.query(queries.addBook, [BookNumber, BookName, PublicationYear, Pages, Id_Language, Id_Inventory, Publisher_Name, Id_Age_Category, Wishlist_Number]);
        const newBookNumber = result.rows[0].BookNumber;

        // Add to genre_book table
        await client.query(queries.addGenreBook, [IdGenre, newBookNumber]);

        await client.query('COMMIT');
        res.status(201).send("New book and genre association added successfully.");
    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Error adding book with genre:", error);
        res.status(500).send("Failed to add book with genre.");
    } finally {
        client.release();
    }
};
module.exports = {
    getBOOK,
    getEVENT,
    getEventLocation,
    getWORKPLACE,
    updateEVENTByID,
    getEVENTbyId,
    addEVENT,
    getAGENCYById,
    addAGENCY,
    updateAGENCY,
    removeEVENT,
    removeAGENCY,
    addBookWithGenre,

   
    
};