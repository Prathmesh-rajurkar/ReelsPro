import { authOptions } from "@/lib/auth";
import { dbConnect } from "@/lib/db";
import Video from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try {
        await dbConnect();
        const videos = await Video.find({}).sort({ createdAt: -1 }).lean()
        if(!videos || videos.length === 0){
            return NextResponse.json({message:"No Videos Found"}, {status:404})
        }
        return NextResponse.json(videos, {status:200})

    } catch (error) {
        return NextResponse.json({message:"Failed to fetch videos",error}, {status:500})
    }
}

export async function POST(request:NextRequest){
    try {
        const session = await getServerSession(authOptions)
        if(!session){
            return NextResponse.json({message:"Unauthorized"}, {status:401})
        }
        await dbConnect();
        
    } catch (error) {
        
    }
}