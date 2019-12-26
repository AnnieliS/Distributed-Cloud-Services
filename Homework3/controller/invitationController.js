const Invitations = require('../database/connector');
const mongoose = require('mongoose');
const moment = require('moment');
const errHandler = require('../middleware/errorHandler');
class InvitationController {
    static async create(req, res) {
        try {
            if (!req.body.inviteNum || !req.body.names_getting_married || !req.body.name || !req.body.year || !req.body.month || !req.body.day || !req.body.attendence) throw {
                status: 404,
                message: 'Missing Information try again'
            };
            this.checkID(req.body.inviteNum);

            let date = moment(`${req.body.day}-${req.body.month}-${req.body.year}`, "DD-MM-YYYY");

            if (!date.isValid()) throw {
                status: 404,
                message: 'Incorrect date'
            };

            let inv = new Invitations({
                inviteNum: req.body.inviteNum,
                names_getting_married: req.body.names_getting_married,
                date: date.format('DD-MM-YYYY'),
                name: req.body.name
            });

            if (req.body.attendence) {
                if (req.body.attendence >= 0)
                    inv.attendence = req.body.attendence;
                else
                    throw {
                        status: 404,
                        message: 'Invalid number of attending guests'
                    };
            }

            inv._id = new mongoose.Types.ObjectId(inv.inviteNum);

            let obj = await inv.exists();

            if (obj)
                throw {
                    status: 409,
                    message: 'An invitation with same id already exists' 
                };

            await inv.save();
            res.status(200).send(`Inserted Successfully under ${inv.id} or ${inv.inviteNum}`);

        } catch (err) {
            errHandler.Error(res, err);
        };
    }

    static async read(req, res) {
        try {
            this.checkID(req.params.inviteNum);
            let obj = await Invitations.getInvitation(req.params.inviteNum);
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


    static async update(req, res) {
        try {
            this.checkID(req.params.inviteNum);
            let obj = await Invitations.getInvitation(req.params.inviteNum);
            if (!obj) throw {
                status: 204,
                message: 'The invitation doesnt exist'
            };

            if (req.body.names_getting_married)
                obj.names_getting_married = req.body.names_getting_married;
            if (req.body.year && req.body.month && req.body.day) {
                let date = moment(`${req.body.day}-${req.body.month}-${req.body.year}`, "DD-MM-YYYY");

                if (!date.isValid()) throw {
                    status: 404,
                    message: 'Incorrect date'
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
            this.checkID(req.params.inviteNum);
            let obj = await Invitations.getInvitation(req.params.inviteNum);
            if (!obj) throw {
                status: 204,
                message: 'The invitation doesnt exist'
            };
            let tmp = await Invitations.deleteInvitation(req.params.inviteNum);
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