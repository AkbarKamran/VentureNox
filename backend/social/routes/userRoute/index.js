const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import {successResponse,invalidParameterResponse,serverError} from '../../utilities/responseHandler'
// Create
router.post("/users", async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: req.body
        });
        return successResponse(201,"Created successfully",user,res)
    }
    catch(error) {
        return serverError(error,res)
    }
});

// Read
router.get("/users/:id", async (req, res) => {
    try {
        if(!req.params.id){
            return invalidParameterResponse("Invalid parameter Id",res)
         }
        const user = await prisma.user.findUnique({
            where: {id: req.params.id}
        });
        return successResponse(200,"Success",user,res)
    }
    catch(error) {
        return serverError(error,res)
    }
});

router.get("/users", async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        return successResponse(200,"Success",users,res)
    }
    catch(error) {
        return serverError(error,res)
    }
});

// Update
router.patch("/users/:id", async (req, res) => {
    try {
        if(!req.params.id){
            return invalidParameterResponse("Invalid parameter Id",res)
         }
        const user = prisma.user.update({
            where: {id: req.params.id},
            data: req.body
        });
        return successResponse(200,"Success",user,res)
    }
    catch(error) {
        return serverError(error,res)
    }
});

// Delete
router.delete("/users/:id", async (req, res) =>{
    try {
        if(!req.params.id){
            return invalidParameterResponse("Invalid parameter Id",res)
         }
        const deletedUser = prisma.user.delete({
            where: {id: req.params}
        });
        return successResponse(200,"Successfully Deleted",deletedUser,res)
    } 
    catch(error) {
        return serverError(error,res);
    }
});

module.exports = router;