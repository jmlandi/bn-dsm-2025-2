import prisma from '../database/client.js'
import { includeRelations } from '../lib/utils.js'

const controller = {}

controller.create = async function(req, res) {
  try {
    await prisma.pedido.create({ data: req.body })
    res.status(201).end()
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.retrieveAll = async function(req, res) {

  const include = includeRelations(req.query);

  try {
    const result = await prisma.pedido.findMany({
     include,
      orderBy: [ { num_pedido: 'asc' }]
    })
    res.send(result)
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.retrieveOne = async function(req, res) {

  const include = includeRelations(req.query);

  try {
    const result = await prisma.pedido.findUnique({
      include,
      where: { id: req.params.id }
    })
    if(result) res.send(result)
    else res.status(404).end()
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.update = async function(req, res) {
  try {
    await prisma.pedido.update({
      where: { id: req.params.id },
      data: req.body
    })
    res.status(204).end()
  }
  catch(error) {
    console.error(error)
    if(error?.code === 'P2025') {
      res.status(404).end()
    }
    else {
      res.status(500).send(error)
    }
  }
}

controller.delete = async function(req, res) {
  try {
    await prisma.pedido.delete({
      where: { id: req.params.id }
    })
    res.status(204).end()
  }
  catch(error) {
    console.error(error)
    if(error?.code === 'P2025') {
      res.status(404).end()
    }
    else {
      res.status(500).send(error)
    }
  }
}

export default controller
