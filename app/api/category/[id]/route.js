import dbConnect from '@/lib/db';
import Category from "@/models/Category";

export async function GET(request, { params }) {
    await dbConnect();
    const id = params.id;
    const category = await Category.findById(id)
    return Response.json(category);
}

export async function DELETE(request, { params }) {
    await dbConnect();
    const id = params.id;
    const category = await Category.findByIdAndDelete(id)
    return Response.json(category);
}