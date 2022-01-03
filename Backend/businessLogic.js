// Read the Library Books from the JSON file 
const fs= require('fs');
const libraryBooks = JSON.parse(fs.readFileSync('./LibraryBooks.json'));

// Code referred: https://www.bezkoder.com/node-express-mongodb-crud-rest-api/
exports.findAll = (req, res) => {
    res.send(libraryBooks)
};

// Add new Book
exports.addBook = (req, res) => {
    // Validate request
    if (!req.body.language || !req.body.library_location || !req.body.price) {
        res.status(400).send({ message: "The programming language, library location and price can not be empty!" });
        return;
    }

    //calculate new book ID
    // Sort array referrence - https://www.codegrepper.com/code-examples/javascript/node+js+sort+array+of+objects
    var sortedBook = libraryBooks.sort(function(a, b) {
        return b.id - a.id;
      });
    
    // Create a New Library Book
    const newBook = {
        "id": sortedBook[0].id + 1,
        "language": req.body.language,
        "edition": req.body.edition,
        "library_location": req.body.library_location,
        "price": req.body.price
    };

    try
    {
        libraryBooks.push(newBook);
        res.send(libraryBooks)
    }
    catch(e)
    {
        res.status(500).send({ message: err.message || "Some error occurred while creating the Library Book." });
    }
};

// Delete the book
exports.deleteBook = (req, res) => {
    const bookId = req.params.id;
    const isRecordExists = false;
    // try-catch in node js - https://nodejs.org/en/knowledge/errors/what-is-try-catch/
    try {
        // https://stackoverflow.com/questions/35948669/how-to-check-if-a-value-exists-in-an-object-using-javascript/57944826
          Object.keys(libraryBooks).forEach(function(key) {
            if (key == 'id' && parseInt(obj[key]) === bookId) {
                isRecordExists = true;
            }
          });
        
        // https://stackoverflow.com/questions/13834338/deleting-a-row-from-javascript-object
        if (isRecordExists)
        {
            libraryBooks = libraryBooks.filter(function( obj ) {
                return obj.id != bookId;
              });                 
              res.send(libraryBooks)
        }

        if (!isRecordExists) {
            res.status(404).send({
            message: `Cannot delete Library book with id=${bookId}. Maybe Library book was not found!`
            });
        } else {
            res.send({
            message: "Library book was deleted successfully!"
            });
        }
    }
    catch (e) {
      res.status(500).send({
        message: "Could not delete Library book with id=" + bookId
      });
    }
};