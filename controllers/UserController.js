import User from './../models/User';

class UserController {
    constructor(model) {
        this.model = model
    }
    /**
     * Retun lessons list
     * @param {*} req 
     * @param {*} res 
     */
    index(req, res) {
        try {
            const users = this.model.findall();
            res.status(200).json(users);
        } catch(e) {
            res.send(500).json({ errorMessage: "The users information could not be retrieved." })   
        }
        
    }

    /**
     * Create new lesson an return the new created user
     * @param {*} req 
     * @param {*} res 
     */
    create(req, res) {
        try {
            if (!this.validate(req.body)) {
                return res.status(400).json({errorMessage: "Please provide name and bio for the user."});
            }
            const newUser = this.model.create(req.body)
            return res.status(201).json(newUser);
        } catch(e) {
            return res.status(500).json({errorMessage: "There was an error while saving the user to the database."});
        }

    }

    /**
     * Return one user
     * @param {*} req 
     * @param {*} res 
     */
    show(req, res) {
        try {
            if (!parseInt(req.params.id)) return res.status(400).json({erroMessage: "No 'id' found in the request params."});
            const user = this.model.findone(req.params.id)
            if (!user) {
                return res.status(404).json(
                    { errorMessage: "The user with the specified ID does not exist." }
                )
            }
            return res
                    .status(200)
                    .json(user);
        } catch(e) {
            res.status(500)
                .json({ errorMessage: "The user information could not be retrieved." })
        }
    }

    /**
     * Update lesson and return updated user
     * @param {*} req 
     * @param {*} res 
     */
    update(req, res) {
        try {
            if (!parseInt(req.params.id)) return res.status(400).json({erroMessage: "No 'id' found in the request params."});
            if (!this.validate(req.body)) {
                return res.status(400).json({erroMessage: "Please provide name and bio for the user."});
            }
            const updatedUser = this.model.update(req.params.id, req.body);
            if (!updatedUser) {
                return res.status(404).json(
                    { errorMessage: "The user with the specified ID does not exist." }
                )
            }
            return res.status(200).json(updatedUser);
        } catch(e) {
            res.status(500).json(
                { errorMessage: "The user information could not be modified." }
            )
        }

    }
    
    /**
     * Delete user and return deleted id
     * @param {*} req 
     * @param {*} res 
     */
    delete(req, res) {
        try {
            if (!req.params.id) return res.status(400).json({erroMessage: "No 'id' found in the request params."});
            const deletedId = this.model.delete(req.params.id);
            if (!deletedId) {
                return res.status(404).json(
                    { erroMessage: "The user with the specified ID does not exist." }
                )
            }
            return res.status(200).json({id: deletedId});
        } catch(e) {
            return res.status(500).json(
                { errorMessage: "The user could not be removed" }
            )
        }
        
    }

    validate(body) {
        if (!body.name || !body.bio) return false;
        else if (body.name && !body.name.trim()) return false;
        else if (body.bio && !body.bio.trim()) return false;
        else return true;
    }
}

export default new UserController(new User());