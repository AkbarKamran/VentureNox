const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import {successResponse,invalidParameterResponse,serverError} from '../../utilities/responseHandler'
// Create
router.post("/tenant", async (req, res) => {
    try {
        const tenant = await prisma.tenant.create({
            data: req.body
        });
        return successResponse(201,"Created successfully",tenant,res)
    }
    catch(error) {
        return serverError(error,res)
    }
});

// Read
router.get("/tenant/:id", async (req, res) => {
    try {
        if(!req.params.id){
           return invalidParameterResponse("Invalid parameter Id",res)
        }
        const tenant = await prisma.tenant.findUnique({
            where: {id: req.params.id}
        });
        return successResponse(200,"Success",tenant,res)
    }
    catch(error) {
        return serverError(error,res)
    }
});

router.get("/tenant", async (req, res) => {
    try {
        const tenants = await prisma.tenant.findMany();
        return successResponse(200,"Success",tenants,res)
    }
    catch(error) {
        return serverError(error,res)
    }
});

// Update
router.patch("/tenant/:id", async (req, res) => {
    try {
        if(!req.params.id){
            return invalidParameterResponse("Invalid parameter Id",res)
         }
        const tenant = prisma.tenant.update({
            where: {id: req.params.id},
            data: req.body
        });
        return successResponse(200,"Success",tenant,res)
    }
    catch(error) {
        return serverError(error,res)
    }
});

// Delete
router.delete("/tenant/:id", async (req, res) =>{
    try {
        if(!req.params.id){
            return invalidParameterResponse("Invalid parameter Id",res)
         }
        const deletedtenant = prisma.tenant.delete({
            where: {id: req.params}
        });
        return successResponse(200,"Successfully Deleted",deletedtenant,res)
    } 
    catch(error) {
        return serverError(error,res);
    }
});

module.exports = router;