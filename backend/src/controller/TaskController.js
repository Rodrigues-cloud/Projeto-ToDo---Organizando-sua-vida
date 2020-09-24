const { response } = require('express');
const { stat } = require('fs');
const TaskModel = require('../model/TaskModel');
const {
    startOfDay,
    endOfDay,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    startOfYear,
    endOfYear } = require('date-fns');

const current = new Date();

class TaskController {

    async create(req, res) {
        const task = new TaskModel(req.body);
        await task
            .save()
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }

    async update(req, res) {
        await TaskModel.findByIdAndUpdate({ '_id': req.params.id }, req.body, { new: true })
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });

    }

    async all(req, res) {
        await TaskModel.find({ macaddress: { '$in': req.params.macaddress } })
            .sort('when')
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }

    async show(req, res) {
        await TaskModel.findById(req.params.id)
            .then(response => {
                if (response)
                    return res.status(200).json(response);
                else
                    return res.status(404).json({ error: 'tarefa não encontrada' });
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }

    async delete(req, res) {
        await TaskModel.deleteOne({ _id: req.params.id })
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }

    async done(req, res) {
        await TaskModel.findByIdAndUpdate(
            { '_id': req.params.id },
            { 'done': req.params.done },
            { new: true })
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }

    //verificando no mongodb tarefas atrasadas por data e hora
    async late(req, res) {
        await TaskModel
            .find({
                'when': { '$lt': current }, //função $lt pegando data e hora corrente
                'macaddress': { '$in': req.params.macaddress }
            })
            .sort('when')
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }

    //verificando tarefa por dia 
    async today(req, res) {
        await TaskModel
            .find({
                'macaddress': { '$in': req.params.macaddress },
                'when': { '$gte': startOfDay(current), '$lte': endOfDay(current) }
                //gte esta pegando a data e hora >= a corrente e lt <= ao fim do dia.
            })
            .sort('when')
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }

    //verificando tarefa por semana
    async week(req, res) {
        await TaskModel
            .find({
                'macaddress': { '$in': req.params.macaddress },
                'when': { '$gte': startOfWeek(current), '$lte': endOfWeek(current) }
                //gte esta pegando a data e hora >= a corrente e lt <= ao fim do dia e ...
                // primeiro e ultimo dia da semana.
            })
            .sort('when')
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }

    //verificando tarefa por mes
    async month(req, res) {
        await TaskModel
            .find({
                'macaddress': { '$in': req.params.macaddress },
                'when': { '$gte': startOfMonth(current), '$lte': endOfMonth(current) }
                //gte esta pegando a data e hora >= a corrente e lt <= ao fim do dia e ...
                // primeiro e ultimo dia do m.
            })
            .sort('when')
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }

    //verificando tarefa por ano
    async year(req, res) {
        await TaskModel
            .find({
                'macaddress': { '$in': req.params.macaddress },
                'when': { '$gte': startOfYear(current), '$lte': endOfYear(current) }
                //gte esta pegando a data e hora >= a corrente e lt <= ao fim do dia e ...
                // primeiro e ultimo dia do ano.
            })
            .sort('when')
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }

}

module.exports = new TaskController();