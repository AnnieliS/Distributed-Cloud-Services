const Invitations = require('../database/connector');
const mongoose = require('mongoose');
const moment = require('moment');
const errHandler = require('../errorHandle/errorhandler');
class InvitationController {
    static async create(req, res) {
        try {
            if (!req.body.uniqId || !req.body.names_getting_married || !req.body.name || !req.body.year || !req.body.month || !req.body.day || !req.body.attendence) throw {
                status: 404,
                message: 'Missing Information try again'
            };
            this.checkID(req.body.uniqId);

            let date = moment(`${req.body.day}-${req.body.month}-${req.body.year}`, "DD-MM-YYYY");

            if (!date.isValid()) throw {
                status: 404,
                message: 'Incorrect date!'
            };

            let inv = new Invitation({
                id: req.body.uniqId,
                names_getting_married: req.body.names_getting_married,
                date: date.format('DD-MM-YYYY')
            });

            if (req.body.attendence) {
                if (req.body.rating >= 0)
                    inv.attendence = req.body.attendence;
                else
                    throw {
                        status: 404,
                        message: 'Invalid number of attending guests'
                    };
            }

            inv._id = new mongoose.Types.ObjectId(inv.uniqId);

            let obj = await inv.exists();

            if (obj)
                throw {
                    status: 409,
                    message: 'An invitation with same id already exists' 
                };

            await inv.save();
            res.status(200).send(`Inserted Successfully under ${inv.id} or ${inv.uniqId}`);

        } catch (err) {
            errHandler.Error(res, err);
        };
    }

    static async read(req, res) {
        try {
            this.checkID(req.params.uniqId);
            let obj = await Invitations.getInvitation(req.params.uniqId);
            if (!obj) throw {
                status: 204,
                message: 'There is no invitation with that id'
            };
            res.status(200).json(obj);
        } catch (err) {
            errHandler.Error(res, err);
        }
    }

    static async readAll(req, res) {
        try {
            let obj = await Invitations.getInvitations();
            if (!obj || obj.length == 0) throw {
                status: 204,
                message: 'There are no invitations'
            };
            res.status(200).json(obj);
        } catch (err) {
            errHandler.Error(res, err);
        }
    }

    // static async topRated(req, res) {
    //     try {
    //         let movies = await Movies.getMovies();
    //         if (!movies || movies.length == 0) throw {
    //             status: 204,
    //             message: 'There are no record'
    //         };

    //         let top = movies[0].rating;
    //         let topList = [];
    //         movies.forEach(element => {
    //             if (top < element.rating)
    //                 top = element.rating;
    //         });

    //         movies.forEach(element => {
    //             if (top == element.rating)
    //                 topList.push(element);
    //         });

    //         res.status(200).json(topList);
    //     } catch (err) {
    //         errHandler.Error(res, err);
    //     }
    // }

    // static async filter(req, res) {
    //     try {
    //         let movies = await Movies.getMovies();
    //         if (!movies || movies.length == 0) throw {
    //             status: 204,
    //             message: 'There are no record'
    //         };

    //         let filtered = [];

    //         movies.forEach(element => {
    //             if (element.name == req.params.data || element._id == req.params.data || element.rating == req.params.rating)
    //                 filtered.push(element);
    //             if (moment(req.params.data).isValid() && moment(element.date, "DD-MM-YYYY") == moment(req.params.data, "DD-MM-YYYY"))
    //                 filtered.push(element);
    //         });

    //         if (filtered.length == 0) throw {
    //             status: 204,
    //             message: 'There are no records with this filter'
    //         };

    //         res.status(200).json(filtered);
    //     } catch (err) {
    //         errHandler.Error(res, err);
    //     }
    // }

    static async update(req, res) {
        try {
            this.checkID(req.params.uniqId);
            let obj = await Invitations.getInvitation(req.params.uniqId);
            if (!obj) throw {
                status: 204,
                message: 'The movie doesnt exist'
            };

            if (req.body.names_getting_married)
                obj.names_getting_married = req.body.names_getting_married;
            if (req.body.year && req.body.month && req.body.day) {
                let date = moment(`${req.body.day}-${req.body.month}-${req.body.year}`, "DD-MM-YYYY");

                if (!date.isValid()) throw {
                    status: 404,
                    message: 'Incorrect date!'
                };

                obj.date = date.format('DD-MM-YYYY');
            }

            if (req.body.name)
                obj.name = req.body.name;

                if (req.body.attendence)
                obj.attendence = req.body.attendence;

            let r = await Invitations.updateInvitation(obj);
            if (r.nModified == 0)
                res.status(200).send(`Already up to date`);
            else
                res.status(200).send(`Successfully updated`);

        } catch (err) {
            errHandler.Error(res, err);
        }
    }

    static async delete(req, res) {
        try {
            this.checkID(req.params.uniqId);
            let obj = await Invitation.getInvitation(req.params.uniqId);
            if (!obj) throw {
                status: 204,
                message: 'The invitation doesnt exist'
            };
            let tmp = await Invitations.deleteInvitation(req.params.uniqId);
            if (tmp.deleteCount == 0) throw {
                status: 204,
                message: 'There is notihng to delete'
            };
            res.status(200).send(`Successfully removed`);
        } catch (err) {
            errHandler.Error(res, err);
        }
    }

    static checkID(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) throw {
            status: 403,
            message: 'Invalid Id'
        };
    }
}

module.exports = InvitationController;