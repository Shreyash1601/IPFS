import express from 'express'
import * as IPFS from "ipfs";
const hostname='0.0.0.0';
var ipfs;

import cors from "cors"
const IP=express()
IP.use(express.json())
IP.use(cors({
    origin:"*"
}))
IP.post('/ipfs',async (req,res)=>{
    console.log("Inside IPFS")

    const {StoreName,Invoice,PCategory,ProductName,ProductPrice,DOP, DOM,LTS,CustomerName,AadharCard, email,phone,MIStoreID,PManufacture,ShippedBy,PSpecs}=req.body;

    {

    const data={
        StoreName:StoreName,
        PManufacture:PManufacture,
        ShippedBy:ShippedBy,
        PSpecs:PSpecs,
        Invoice:Invoice,
        PCategory:PCategory,
        ProductName:ProductName,
        ProductPrice:ProductPrice,
        DOP:DOP,
        DOM:DOM,
        LTS:LTS,
        CustomerName:CustomerName,
        AadharCard:AadharCard,
        email:email,
        phone:phone,
        MIStoreID:MIStoreID
    }
    try{


    console.log("loading...")
    const { cid } = await ipfs.add(JSON.stringify(data));
    console.log(cid)
    res.status(200).json({"CID":cid.toString()})
    }catch(err){
        console.log(err)
        res.status(422).json({error:"Somme errorr occurred from IPFS serverr"})
    }
    }
   
})




IP.get('/',(req,res)=>{
    res.send("Welcome to IPFS server made specifically for Block Pe")
})

IP.listen(process.env.PORT||5000,hostname,async ()=>{
ipfs = await IPFS.create()

    console.log("IPFS server running")
})