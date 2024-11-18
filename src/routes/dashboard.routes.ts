import express, { Request, Response } from 'express'
import * as dashboardController from '../controllers/dashboardController'

const dashboardRouter = express.Router()

dashboardRouter.get('/', dashboardController.getDashboardData)

export default dashboardRouter
